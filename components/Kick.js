import styles from '../styles/Kick.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Kick(){

    return (
        <>
        <div className={styles.kick}>
            <div className={styles.kicker}>
              <img className={styles.imgLogin} src="logo.webp"/>
              <h3>Jean-Claude</h3>
              <h4>@JCVD - 5 hours</h4>
            </div>
              <p>Voici mon kick</p>
              <div className={styles.like}>
                <FontAwesomeIcon icon={faHeart}/>
                <p>4</p>
              </div>
              
          </div>
        </>
        
    )

}

export default Kick;