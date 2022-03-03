import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';

import { WalletContext } from '../contexts';
import commonStyles from '../common.module.css';
import walletStyles from './wallet.module.css';

// TODO: refactor using chakra-ui mdoal
export default function DisconnectWallet({ showDisconnectWallet, setDisconnectWallet }) {
  const { setShowDisconnectWallet, address } = useContext(WalletContext);

  return (
    <div
      className={walletStyles.modal}
      style={{ display: showDisconnectWallet ? 'block' : 'none' }}
    >
      <div className={walletStyles.main}>
        <div className={walletStyles.container}>Address:</div>
        <div className={walletStyles.container}>{address}</div>
        <Flex className={walletStyles.container}>
          <button className={commonStyles.walletBtn} onClick={() => setShowDisconnectWallet(false)}>
            Close
          </button>
          <button className={commonStyles.walletBtn} onClick={() => setDisconnectWallet(true)}>
            Disconnect
          </button>
        </Flex>
      </div>
    </div>
  );
}
