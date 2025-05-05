import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTrendsData } from "../reducers/trendsData";
import { setKicksData } from "../reducers/kicksData";
import { setLikedKicks } from "../reducers/likedKicks";
import { clickTrend } from "../reducers/trend";

import styles from "../styles/Hashtag.module.css";
import Kick from "./Kick";
import Trend from "./Trend";
import Sidebar from "./Sidebar";

const BACKEND_URL = "http://localhost:3000";

function Hashtag() {
  const trend = useSelector((store)=> store.trend.value)
  const [text, setText]= useState(trend)
  const [trendsData, setTrendsData]= useState([])
  const [kicksData, setKicksData] = useState([])
  const user = useSelector((store) => store.user.value);
  const likedKicks = useSelector((store) => store.likedKicks.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Mount");
    refreshView();
    setText(trend)
  }, [user, trend]);

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
          setKicksData(data.kicks);
        }
      })
      .then(console.log("kickData refreshed", kicksData));
  }

  async function refreshLickedKick() {
    fetch(`${BACKEND_URL}/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data);
          dispatch(setLikedKicks(data.user.likedKicks));
        }
      });
  }

  async function likeClicked() {
    refreshView();
  }

  async function deleteClicked() {
    refreshView();
  }

  let filterTrend= trendsData.filter((e) => text.toLowerCase() === e.name.toLowerCase())[0]
  console.log('filterTREND',filterTrend)

  let kicks=[]
  if(filterTrend){
    kicks = kicksData
    .filter(e => filterTrend.kicks.includes(e._id))
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
          isLiked={likedKicks.includes(k._id)}
          isAuthor={k.author.username === user.username}
          likeClicked={likeClicked}
          deleteClicked={deleteClicked}
        />
      );
    });
  }
  

  //fetch for grab DB informations
  function seeTrends() {
    fetch(`${BACKEND_URL}/trends`)
      .then((response) => response.json())
      .then((data) => {
        setTrendsData(data.trends);
      });
  }


    //reorder trends by number of trends
    const orderTrends = trendsData.sort((a, b) => b.kicks.length - a.kicks.length).slice(0,5)
    // filter trends if there is 0 kick
    const filterZeroTrends = orderTrends.filter((data) => data.kicks.length !== 0)
    //map order
    const allTrends = filterZeroTrends.map((data,i)=>{
      return <Trend key={i} name={data.name} kicks={data.kicks.length} onClick={()=> dispatch(clickTrend(data.name))
      }/>
    })
  

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.middleContainer}>
        <div className={styles.addKick}>
          <h2 className={styles.H2}>Hashtag</h2>
          <input className={styles.input} type="text" onChange={(e)=> setText(e.target.value)} value={text} />
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

export default Hashtag;
