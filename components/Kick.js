import { useSelector } from "react-redux";
import styles from "../styles/Kick.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

const BACKEND_URL = "http://localhost:3000";

function formatRelativeTime(timestamp) {
  const now = Math.floor(Date.now() / 1000);
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
  const user = useSelector((store) => store.user.value);
  let kickedAgo = formatRelativeTime(props.sentAt);

  async function hanleLikeClick() {
    // update DB
    let response = await fetch(`${BACKEND_URL}/kicks/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        likerToken: user.token,
        kickId: props.id,
      }),
    });
    let data = await response.json();
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
          <img
            className={styles.imgLogin}
            src={`profile-pics/${props.username}.png`}
            alt={props.username}
          />
          <h3 className={styles.H3}>{props.firstname}</h3>
          <h4 className={styles.H3}>{`@${props.username} - ${kickedAgo}`}</h4>
        </div>
        <p>{props.message}</p>
        <div className={styles.like}>
          <p>
            <FontAwesomeIcon
              icon={faHeart}
              className={`${styles.notLiked} ${props.isLiked && styles.liked }`}
              onClick={() => hanleLikeClick()}
            /> 
            {props.nbLikes}
            {props.isAuthor && (
              <FontAwesomeIcon className={styles.trash}
                icon={faTrash}
                onClick={() => handleDeleteClicked()}
              />
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default Kick;
