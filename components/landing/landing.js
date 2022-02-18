import { Link } from "react-router-dom";
import styles from './landing.module.css';
import { useContext } from "react";
import { WalletContext } from "../contexts";

export default function Landing() {
  const { setShowConnectWallet, address } = useContext(WalletContext);

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.title}>Fat Cats</div>
        </div>
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            {!address &&
              <button className={styles.button} onClick={() => setShowConnectWallet(true)}>Connect Wallet</button>
            }
            {address &&
              <button className={styles.button}>
                <Link to="/mint">Mint</Link>
              </button>
            }
          </div>
        </div>
        <div className={styles.container}>
          <img className={styles.img} src="https://storage.googleapis.com/fat-cats-nft-test-images/fat%20cat.jpeg" alt="Fat Cat"></img>
        </div>
      </div>
    </div>
  );
}
