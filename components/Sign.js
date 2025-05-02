import styles from '../styles/Sign.module.css';

function Sign() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org"> SIGN</a>
        </h1>
      </main>
    </div>
  );
}

export default Sign;
