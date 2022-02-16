import { useRouter } from "next/router";
import Header from "../components/header";
import styles from '../styles/index.module.css';

export default function App() {
  const router = useRouter();

  return (
    < div>
      <Header />
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.title}>Fat Cats</div>
        </div>
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={() => router.push('/mint')}>Mint</button>
          </div>
        </div>
        <div className={styles.container}>
          <img className={styles.img} src="https://storage.googleapis.com/fat-cats-nft-test-images/fat%20cat.jpeg" alt="Fat Cat"></img>
        </div>
      </div>
    </div >
  );
}
