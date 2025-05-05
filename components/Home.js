import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setKicksData } from "../reducers/kicksData";
import { setTrendsData } from "../reducers/trendsData";
import { setLikedKicks } from "../reducers/likedKicks";
import { logout } from "../reducers/user";

import styles from "../styles/Home.module.css";
import Kick from "./Kick";
import Trend from "./Trend";

const BACKEND_URL = "http://localhost:3000";

function Home() {
  const [textKick, setTextKick] = useState([]);
  const [textLength, setTextLength] = useState(0);
  const user = useSelector((store) => store.user.value);
  const kicksData = useSelector((store) => store.kicksData.value);
  const trendsData = useSelector((store) => store.trendsData.value);
  const likedKicks = useSelector((store) => store.likedKicks.value);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log("Mount");
    refreshView();
  }, [user]);

  function logMeOut() {
    dispatch(logout());
    dispatch(setLikedKicks([]));
    router.replace("/");
  }

  async function refreshView() {
    await refreshLikedKicks();
    await refreshKickData();
    await seeTrends();
  }

  async function refreshKickData() {
    fetch(`${BACKEND_URL}/kicks/all`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(setKicksData(data.kicks));
        }
      })
      .then(console.log("kickData refreshed"));
  }

  async function refreshLikedKicks() {
    let response = await fetch(`${BACKEND_URL}/users/${user.token}`);
    let data = await response.json();
    if (data.result) {
      dispatch(setLikedKicks(data.user.likedKicks));
    }
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
    setTextKick('');
    setTextLength(0);
    
    refreshView();
  }

  let kicks = [...kicksData]
    .sort((a, b) => b.sentAtTimestamp - a.sentAtTimestamp)
    .map((k, i) => {
      return (
        <Kick
          className={styles.kicks}
          key={i}
          id={k._id}
          username={k.author.username}
          firstname={k.author.firstname}
          message={k.message}
          nbLikes={k.nbLikes}
          sentAt={k.sentAtTimestamp}
          isLiked={[...likedKicks].includes(k._id)}
          isAuthor={k.author.username === user.username}
          likeClicked={likeClicked}
          deleteClicked={deleteClicked}
        />
      );
    });

  //fetch for grab DB informations
  async function seeTrends() {
    let response = await fetch(`${BACKEND_URL}/trends`);
    let data = await response.json();
    dispatch(setTrendsData(data.trends));
  }

  //reorder trends by number of trends
  const orderTrends = [...trendsData]
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
      <div className={styles.leftContainer}>
        <img
          src="logo_white.webp"
          className={styles.logo}
          onClick={(e) => {
            logMeOut();
          }}
        />
        {user.username != null && (
          <div className={styles.user}>
            <img className={styles.imgLogin} src="logo.webp" />
            <div className={styles.txtLogin}>
              <h3 className={styles.H3}>{user.firstname}</h3>
              <h4 className={styles.H4}>@{user.username}</h4>
            </div>
          </div>
        )}
      </div>

      <div className={styles.middleContainer}>
        <div className={styles.addKick}>
          <h2 className={styles.H2}>Home</h2>
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
        <h2 className={styles.H2}>Trends</h2>
        <div className={styles.blockTrends}>{allTrends}</div>
      </div>
    </div>
  );
}

export default Home;
