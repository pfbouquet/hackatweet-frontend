import styles from "../styles/Home.module.css";
import Kick from "./Kick";

let kickData = [
  {
    username: "JCVD",
    firstname: "Jean-Claude",
    message: "Ceci est mon kick :)",
    nbLikes: 5,
  },
  {
    username: "JCVD",
    firstname: "Jean-Claude",
    message: "Qui kickera kickera.",
    nbLikes: 0,
  },
];

function Home() {
  let kicks = kickData.map((k) => (
    <Kick
      username={k.username}
      firstname={k.firstname}
      message={k.message}
      nbLikes={k.nbLikes}
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
      </div>
    </div>
  );
}

export default Home;
