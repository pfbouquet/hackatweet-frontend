import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";
import Kick from "./Kick";
import Trend from "./Trend";

const BACKEND_URL = "http://localhost:3000";
const usertoken = "2cjNXWW2eXL65DpRO3_QPh6npQE9K2Wi";

function Home() {
  const [kickData, setKickData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    console.log("Mount");
    refreshUserkData();
    refreshKickData();
  }, []);

  async function refreshKickData() {
    fetch(`${BACKEND_URL}/kicks/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          setKickData(data.kicks);
        }
      });
  }

  async function refreshUserkData() {
    fetch(`${BACKEND_URL}/users/${usertoken}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          setUserData(data.user);
        }
      });
  }

  function likeClicked() {
    refreshKickData();
    refreshUserkData();
  }

  let kicks = kickData.map((k, i) => (
    <Kick
      key={i}
      id={k._id}
      username={k.author.username}
      firstname={k.author.firstname}
      message={k.message}
      nbLikes={k.nbLikes}
      isLiked={userData.likedKicks.includes(k._id)}
      likeClicked={likeClicked}
    />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img src="logo.webp" className={styles.logo} />
        <div className={styles.user}>
          <img className={styles.imgLogin} src="logo.webp" />
          <div className={styles.txtLogin}>
            <h3>Jean-Claude</h3>
            <h4>@JCVD</h4>
          </div>
        </div>
      </div>

      <div className={styles.middleContainer}>
        <div className={styles.addKick}>
          <h2>Home</h2>
          <textarea
            className={styles.textKick}
            rows="5"
            cols="33"
            label="Let's kick it!"
          ></textarea>
          <div className={styles.countAndKick}>
            <p>0/280</p>
            <button className={styles.btnKick}>ZBAM !</button>
          </div>
        </div>

        <div className={styles.feed}>{kicks}</div>
      </div>

      <div className={styles.rightContainer}>
        <h2>Trends</h2>
        <div className={styles.blockTrends}>
          <Trend />
        </div>
      </div>
    </div>
  );
}

export default Home;
