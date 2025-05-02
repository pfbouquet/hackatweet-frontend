import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons';

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

      <div className={styles.middleContainer}>middle
        <div className={styles.addKick}>
          <h1>Home</h1>
          <textarea className={styles.textKick} rows="5" cols="33" label="Let's kick it!"></textarea>
          <div className={styles.countAndKick}>
            <p>0/280</p>
            <button className={styles.btnKick}>ZBAM !</button>
          </div>
        </div>

        <div className={styles.feed}>
          <div styles={styles.kick}>
            <img className={styles.imgLogin} src="logo.webp"/>
            <div className={styles.kicker}>
              <h3>Jean-Claude</h3>
              <h4>@JCVD - 5 hours</h4>
            </div>

            <p>Voici mon kick</p>
            <FontAwesomeIcon icon={faHeart}/>
            <p>4</p>
          </div>
        </div>
      </div>

      
      <div className={styles.rightContainer}>right</div>
    </div>
  );
}

export default Home;
