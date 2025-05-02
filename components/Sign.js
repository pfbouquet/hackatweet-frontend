import React from 'react';
import styles from '../styles/Sign.module.css';

const Sign = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <img src="logo.webp" alt="Hackatweet Logo" className={styles.logo} />
      </div>
      <div className={styles.rightPanel}>
        <img src="logo_white.webp" alt="Small Logo" className={styles.smallLogo} />
        <h1 className={styles.title}>Vient kicker avec Jean Claude</h1>
        <h2 className={styles.subtitle}>Join JCV kicks</h2>
        <button className={`${styles.btn} ${styles.primary}`}>Kick up</button>
        <p className={styles.accountText}>Tu as déjà un account?</p>
        <button className={`${styles.btn} ${styles.secondary}`}>Kick in</button>
      </div>
    </div>
  );
};

export default Sign;

