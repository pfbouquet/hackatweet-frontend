import styles from "../styles/Kick.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const BACKEND_URL = "http://localhost:3000";
const usertoken = "2cjNXWW2eXL65DpRO3_QPh6npQE9K2Wi";

function Kick(props) {
  let kickedAgo = "5 hours";
  let userPic = "logo.webp";

  async function hanleLikeClick() {
    // update DB
    let response = await fetch(`${BACKEND_URL}/kicks/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        likerToken: usertoken,
        kickId: props.id,
      }),
    });
    let data = await response.json();
    // call parent for updating view
    props.likeClicked();
  }

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
          <FontAwesomeIcon
            icon={faHeart}
            className={`${props.isLiked && styles.liked}`}
            onClick={() => hanleLikeClick()}
          />
          <p>{props.nbLikes}</p>
        </div>
      </div>
    </>
  );
}

export default Kick;
