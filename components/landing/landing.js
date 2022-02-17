import { Link } from "react-router-dom";
import { useRouter } from "next/router";
import styles from './landing.module.css';

export default function Landing() {

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.title}>Fat Cats</div>
        </div>
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>
              <Link to="/mint">Mint</Link>
            </button>
          </div>
        </div>
        <div className={styles.container}>
          <img className={styles.img} src="https://storage.googleapis.com/fat-cats-nft-test-images/fat%20cat.jpeg" alt="Fat Cat"></img>
        </div>
      </div>
    </div>
  );
}
