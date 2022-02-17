import { Link } from "react-router-dom";
import { useRouter } from "next/router";
import styles from './header.module.css';

export default function Header() {
    const router = useRouter();

    return (
        <div className={styles.header}>
            <div className={styles.halfContainer}>
                <div className={styles.alignLeft}>
                    <button className={styles.button}>
                        <Link to="/">Home</Link>
                    </button>
                    <button className={styles.button}>
                        <Link to="/mint">Mint</Link>
                    </button>
                </div>
            </div>
            <div className={styles.halfContainer}>
                <div className={styles.alignRight}>
                    <button className={styles.button}>Connect Wallet</button>
                </div>
            </div>
        </div>
    )
}