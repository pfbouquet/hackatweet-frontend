import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import styles from "../styles/SignInModal.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

const SignInModal = ({ visible, onCancel }) => {
  const [signInPassword, setSignInPassword] = useState("");
  const [signInKickername, setSignInKickername] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 🔴 état pour l’erreur
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    const payload = {
      password: signInPassword,
      username: signInKickername,
    };

    try {
      const response = await fetch("http://localhost:3000/users/kickin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.result) {
        dispatch(
          login({
            firstname: data.user.firstname,
            token: data.user.token,
            username: data.user.username,
            likedKicks: data.user.likedKicks,
          })
        );
        // ✅ Réinitialise les champs et erreurs
        setSignInPassword("");
        setSignInKickername("");
        setErrorMessage("");
        router.push("/home");
      } else {
        // 🔴 Affiche une erreur utilisateur
        setErrorMessage(
          "Jean Claude n'a pas trouvé ton user ou ton mot de passe est peut-être incorrect."
        );
      }
    } catch (error) {
      // 🔴 Affiche une erreur
      console.error("Erreur fetch :", error);
      setErrorMessage("Erreur de connexion au serveur.");
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      closable={true}
      className={styles.modal}
      centered
    >
      <div className={styles.content}>
        <img src="/logo_white.webp" alt="Logo" className={styles.logo} />
        <h2>Kicknect toi sur ton account</h2>
        <Input
          placeholder="Kickername"
          className={styles.input}
          onChange={(e) => setSignInKickername(e.target.value)}
          value={signInKickername}
        />
        <Input.Password
          placeholder="JCVDMDP"
          className={styles.inputpassword}
          onChange={(e) => setSignInPassword(e.target.value)}
          value={signInPassword}
        />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}{" "}
        {/* 🔴 Message d’erreur */}
        <Button
          type="primary"
          className={styles.signupButton}
          onClick={handleSignIn}
        >
          Kick in
        </Button>
      </div>
    </Modal>
  );
};

export default SignInModal;
