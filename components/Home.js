import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";
import Kick from "./Kick";
import Trend from "./Trend";

const BACKEND_URL = "http://localhost:3000";
const usertoken = "2cjNXWW2eXL65DpRO3_QPh6npQE9K2Wi";

function Home() {
  const [kickData, setKickData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [textKick, setTextKick] = useState([]);
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    console.log("Mount");
    refreshView();
  }, []);

  async function refreshView() {
    await refreshUserData();
    await refreshKickData();
  }

  async function refreshKickData() {
    fetch(`${BACKEND_URL}/kicks/all`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setKickData(data.kicks);
        }
      });
  }

  async function refreshUserData() {
    fetch(`${BACKEND_URL}/users/${usertoken}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setUserData(data.user);
        }
      });
  }

  async function likeClicked() {
    refreshView();
  }

  async function deleteClicked() {
    refreshView();
  }

  async function zbamClicked() {
    let response = await fetch(`${BACKEND_URL}/kicks/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: usertoken,
        message: textKick,
      }),
    });
    refreshView();
  }

  let kicks = kickData
    .sort((a, b) => b.sentAtTimestamp - a.sentAtTimestamp)
    .map((k, i) => {
      return (
        <Kick
          key={i}
          id={k._id}
          username={k.author.username}
          firstname={k.author.firstname}
          message={k.message}
          nbLikes={k.nbLikes}
          sentAt={k.sentAtTimestamp}
          isLiked={userData.likedKicks.includes(k._id)}
          isAuthor={k.author.username === userData.username}
          likeClicked={likeClicked}
          deleteClicked={deleteClicked}
        />
      );
    });

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img src="logo.webp" className={styles.logo} />
        <div className={styles.user}>
          <img className={styles.imgLogin} src="logo.webp" />
          <div className={styles.txtLogin}>
            <h3>{userData.firstname}</h3>
            <h4>@{userData.username}</h4>
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
            value={textKick}
            onChange={(e) => {
              setTextKick(e.target.value.slice(0, 280));
              setTextLength(e.target.value.length);
            }}
          ></textarea>
          <div className={styles.countAndKick}>
            <p>{textLength}/280</p>
            <button className={styles.btnKick} onClick={() => zbamClicked()}>
              ZBAM !
            </button>
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
