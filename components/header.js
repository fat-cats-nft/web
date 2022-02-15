import { useRouter } from "next/router";
import styles from './header.module.css';

export default function Header() {
    const router = useRouter();

    return (
        <div className={styles.header}>
            <div className={styles.halfContainer}>
                <div className={styles.alignLeft}>
                    <button className={styles.textButton} onClick={() => router.push('/')}>Home</button>
                </div>
            </div>
            <div className={styles.halfContainer}>
                <div className={styles.alignRight}>
                    <button className={styles.connectWalletButton}>Connect Wallet</button>
                </div>
            </div>
        </div>
    )
}