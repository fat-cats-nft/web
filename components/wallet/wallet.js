import { useContext } from "react";
import { WalletContext } from "../contexts";
import formatAddress from "../../helpers";
import styles from './wallet.module.css';

export default function DisconnectWallet({ showDisconnectWallet, setDisconnectWallet }) {
    const { setShowDisconnectWallet, address } = useContext(WalletContext);
    const showHideClassName = showDisconnectWallet ? { display: "block" } : { display: "none" };
    console.log(showHideClassName);

    return (
        <div className={styles.modal} style={showHideClassName}>
            <div className={styles.main}>
                <div className={styles.container}>
                    Address:
                </div>
                <div className={styles.container}>
                    {address}
                </div>
                <div className={styles.container}>
                    <button className={styles.button2} onClick={() => setShowDisconnectWallet(false)}>
                        Close
                    </button>
                </div>
                <div className={styles.container}>
                    <button className={styles.button1} onClick={() => setDisconnectWallet(true)}>
                        Disconnect
                    </button>
                </div>
            </div>
        </div>
    )
}