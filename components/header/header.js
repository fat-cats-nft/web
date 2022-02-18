import { Link } from "react-router-dom";
import styles from './header.module.css';
import { useContext } from "react";
import { WalletContext } from "../contexts";
import formatAddress from "../../helpers";

export default function Header() {
    const { setShowConnectWallet, setShowDisconnectWallet, address } = useContext(WalletContext);

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
                        <button className={styles.button} onClick={() => setShowConnectWallet(true)}>Connect Wallet</button>
                    </div>}
                {address &&
                    <div className={styles.alignRight}>
                        <button className={styles.button} onClick={() => setShowDisconnectWallet(true)}>{formatAddress(address)}</button>
                    </div>}
            </div>
        </div>
    )
}