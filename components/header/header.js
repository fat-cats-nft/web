import { Link } from "react-router-dom";
import styles from './header.module.css';
import { useEffect, useContext } from "react";
import { WalletContext } from "../../components/contexts/wallet";

export default function Header() {
    const { setConnectWallet, setDisconnectWallet, address } = useContext(WalletContext);

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
                {!address &&
                    <div className={styles.alignRight}>
                        <button className={styles.button} onClick={() => setConnectWallet(true)}>Connect Wallet</button>
                    </div>}
                {address &&
                    <div className={styles.alignRight}>
                        <button className={styles.button} onClick={() => setDisconnectWallet(true)}>{address.substr(0, 3) + "..." + address.substr(address.length - 3, address.length)}</button>
                    </div>}
            </div>
        </div>
    )
}