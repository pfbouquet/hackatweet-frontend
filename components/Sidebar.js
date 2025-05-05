import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setLikedKicks } from "../reducers/likedKicks";
import { logout } from "../reducers/user";

import styles from "../styles/Sidebar.module.css";

function Sidebar() {
  const user = useSelector((store) => store.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  function logMeOut() {
    dispatch(logout());
    dispatch(setLikedKicks([]));
    router.replace("/");
  }

  return (
    <div className={styles.sidebar}>
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
  );
}

export default Sidebar;
