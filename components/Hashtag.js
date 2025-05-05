import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "../styles/Home.module.css";
import Trend from "./Trend";
import Sidebar from "./Sidebar";

const BACKEND_URL = "http://localhost:3000";

function Hashtag() {
  const [kickData, setKickData] = useState([]);
  const [textKick, setTextKick] = useState([]);
  const [textLength, setTextLength] = useState(0);
  const [lickedKick, setLickedKick] = useState([]);
  const [trendsData, setTrendsData] = useState([]);
  const user = useSelector((store) => store.user.value);

  useEffect(() => {
    console.log("Mount");
    refreshView();
  }, [user]);

  async function refreshView() {
    await refreshLickedKick();
    await refreshKickData();
    seeTrends();
  }

  async function refreshKickData() {
    fetch(`${BACKEND_URL}/kicks/all`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setKickData(data.kicks);
        }
      })
      .then(console.log("kickData refreshed"));
  }

  async function refreshLickedKick() {
    fetch(`${BACKEND_URL}/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data);
          setLickedKick(data.user.likedKicks);
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
        token: user.token,
        message: textKick,
      }),
    });
    refreshView();
  }

  // let kicks = kickData
  //   .sort((a, b) => b.sentAtTimestamp - a.sentAtTimestamp)
  //   .map((k, i) => {
  //     return (
  //       <Kick
  //         key={i}
  //         id={k._id}
  //         username={k.author.username}
  //         firstname={k.author.firstname}
  //         message={k.message}
  //         nbLikes={k.nbLikes}
  //         sentAt={k.sentAtTimestamp}
  //         isLiked={lickedKick.includes(k._id)}
  //         isAuthor={k.author.username === user.username}
  //         likeClicked={likeClicked}
  //         deleteClicked={deleteClicked}
  //       />
  //     );
  //   });

  //fetch for grab DB informations
  function seeTrends() {
    fetch(`${BACKEND_URL}/trends`)
      .then((response) => response.json())
      .then((data) => {
        setTrendsData(data.trends);
      });
  }

  //reorder trends by number of trends
  const orderTrends = trendsData
    .sort((a, b) => b.kicks.length - a.kicks.length)
    .slice(0, 5);
  // filter trends if there is 0 kick
  const filterZeroTrends = orderTrends.filter(
    (data) => data.kicks.length !== 0
  );
  //map order
  const allTrends = filterZeroTrends.map((data, i) => {
    return <Trend key={i} name={data.name} kicks={data.kicks.length} />;
  });

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.middleContainer}>
        <div className={styles.addKick}>
          <h2>Hashtag</h2>
          <textarea
            className={styles.textKick}
            rows="1"
            cols="33"
            label="Let's kick it!"
            value={textKick}
            onChange={(e) => {
              setTextKick(e.target.value.slice(0, 280));
              setTextLength(e.target.value.length);
            }}
          ></textarea>
        </div>

        {/* <div className={styles.feed}>{kicks}</div> */}
      </div>

      <div className={styles.rightContainer}>
        <h2>Trends</h2>
        <div className={styles.blockTrends}>{allTrends}</div>
      </div>
    </div>
  );
}

export default Hashtag;
