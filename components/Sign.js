import React, { useState } from "react";
import styles from "../styles/Sign.module.css";
//import SignInModal from "../components/SignInModal";
// import { Modal, Input, Button } from 'antd';

import dynamic from "next/dynamic";
const SignInModal = dynamic(() => import("../components/SignInModal"), { ssr: false });
const SignUpModal = dynamic(() => import("../components/SignUpModal"), { ssr: false });

const Sign = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <img src="logo.webp" alt="Hackatweet Logo" className={styles.logo} />
      </div>

      <div className={styles.rightPanel}>
        <img src="logo_white.webp" alt="Small Logo" className={styles.smallLogo} />
        <h1 className={styles.title}>Vient kicker avec Jean Claude</h1>
        <h2 className={styles.subtitle}>Join JCV kicks</h2>
        <button className={`${styles.btn} ${styles.primary}`}onClick={showModal}>
          Kick up
        </button>
        <p className={styles.accountText}>Tu as déjà un account?</p>
        <button className={`${styles.btn} ${styles.secondary}`} onClick={showModal}>
          Kick in
        </button>
      </div>

      {/* Intégration de la modale */}
      <SignInModal visible={isModalVisible} onCancel={handleCancel} />
      <SignUpModal visible={isModalVisible} onCancel={handleCancel} />
    </div>
  );
};

export default Sign;
