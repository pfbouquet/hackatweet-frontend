import styles from '../styles/Kick.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Kick(props) {
  let kickedAgo = "5 hours";
  let userPic = "logo.webp";

  return (
    <>
      <div className={styles.kick}>
        <div className={styles.kicker}>
          <img className={styles.imgLogin} src={userPic} />
          <h3>{props.firstname}</h3>
          <h4>{`@${props.username} - ${kickedAgo}`}</h4>
        </div>
        <p>{props.message}</p>
        <div className={styles.like}>
          <FontAwesomeIcon icon={faHeart} />
          <p>{props.nbLikes}</p>
        </div>
      </div>
    </>
  );
}

export default Kick;
