import styles from "../styles/Kick.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

const BACKEND_URL = "http://localhost:3000";
const usertoken = "2cjNXWW2eXL65DpRO3_QPh6npQE9K2Wi";

function formatRelativeTime(timestamp) {
  const now = new Date().getTime() / 1000;
  const diff = Math.floor(now - timestamp); // en secondes

  if (diff < 60) {
    return `${diff} seconds`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} minutes`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hours`;
  } else {
    const days = Math.floor(diff / 86400);
    return `${days} days`;
  }
}

function Kick(props) {
  let kickedAgo = formatRelativeTime(props.sentAt);
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
    // call parent for updating view
    props.likeClicked();
  }

  async function handleDeleteClicked() {
    let response = await fetch(`${BACKEND_URL}/kicks/delete/${props.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    props.deleteClicked();
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
          {props.isAuthor && (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => handleDeleteClicked()}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Kick;
