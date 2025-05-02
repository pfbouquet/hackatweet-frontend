import styles from '../styles/Home.module.css';
import Kick from './Kick'
import Trend from './Trend'

function Home() {

  return (
    <div className={styles.container}>

      <div className={styles.leftContainer}>
        <img src="logo.webp" className={styles.logo}/>
        <div className={styles.user}>
          <img className={styles.imgLogin} src="logo.webp"/>
          <div className={styles.txtLogin}>
            <h3>Jean-Claude</h3>
            <h4>@JCVD</h4>
          </div>
        </div>
      </div>

      <div className={styles.middleContainer}>
        <div className={styles.addKick}>
          <h2>Home</h2>
          <textarea className={styles.textKick} rows="5" cols="33" label="Let's kick it!"></textarea>
          <div className={styles.countAndKick}>
            <p>0/280</p>
            <button className={styles.btnKick}>ZBAM !</button>
          </div>
        </div>
      
        <div className={styles.feed}>
          <Kick />
        </div>
        
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
