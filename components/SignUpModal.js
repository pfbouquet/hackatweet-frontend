import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import styles from "../styles/SignUpModal.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

const SignUpModal = ({ visible, onCancel }) => {
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpKickername, setSignUpKickername] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    const payload = {
      firstname: signUpUsername,
      password: signUpPassword,
      username: signUpKickername,
    };

    try {
      const response = await fetch("http://localhost:3000/users/kickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.result) {
        dispatch(
          login({
            firstname: data.firstname,
            token: data.token,
            username: data.username,
            likedKicks: [],
          })
        );
        // ✅ Réinitialise les champs et erreurs
        setSignUpUsername("");
        setSignUpPassword("");
        setSignUpKickername("");
        router.push("/home");
      } else {
        // 🔴 Affiche une erreur utilisateur
        console.error("Erreur backend :", data);
      }
    } catch (error) {
      // 🔴 Affiche une erreur
      console.error("Erreur fetch :", error);
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
        <h2>Create ton kick account</h2>
        <Input
          className={styles.input}
          placeholder="Premiername"
          onChange={(e) => setSignUpUsername(e.target.value)}
          value={signUpUsername}
        />
        <Input
          placeholder="Kickername"
          className={styles.input}
          onChange={(e) => setSignUpKickername(e.target.value)}
          value={signUpKickername}
        />
        <Input.Password
          placeholder="JCVDMDP"
          className={styles.inputpassword}
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword}
        />
        <Button
          type="primary"
          className={styles.signupButton}
          onClick={handleSignUp}
        >
          Kick up
        </Button>
      </div>
    </Modal>
  );
};

export default SignUpModal;
