import { useContext } from 'react';

import { WalletContext } from '../contexts';
import commonStyles from '../common.module.css';
import walletStyles from './wallet.module.css';

export default function DisconnectWallet({ showDisconnectWallet, setDisconnectWallet }) {
  const { setShowDisconnectWallet, address } = useContext(WalletContext);
  const showHideClassName = showDisconnectWallet ? { display: 'block' } : { display: 'none' };

  return (
    <div className={walletStyles.modal} style={showHideClassName}>
      <div className={walletStyles.main}>
        <div className={walletStyles.container}>Address:</div>
        <div className={walletStyles.container}>{address}</div>
        <div className={walletStyles.container}>
          <button className={commonStyles.walletBtn} onClick={() => setShowDisconnectWallet(false)}>
            Close
          </button>
        </div>
        <div className={walletStyles.container}>
          <button className={commonStyles.walletBtn} onClick={() => setDisconnectWallet(true)}>
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
