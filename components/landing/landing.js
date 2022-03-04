import Link from 'next/link';
import { useContext } from 'react';

import commonStyles from '../common.module.css';
import landingStyles from './landing.module.css';
import { WalletContext } from '../contexts';

export default function Landing() {
  const { setShowConnectWallet, address } = useContext(WalletContext);

  return (
    <div className={commonStyles.body}>
      <div className={commonStyles.container}>
        <div className={commonStyles.title}>Fat Cats</div>
      </div>
      <div className={commonStyles.container}>
        <div className={commonStyles.buttonContainer}>
          {!address ? (
            <button className={commonStyles.walletBtn} onClick={() => setShowConnectWallet(true)}>
              Connect Wallet
            </button>
          ) : (
            <button className={commonStyles.walletBtn}>
              <Link href="/mint">Mint</Link>
            </button>
          )}
        </div>
      </div>
      <div className={commonStyles.container}>
        <img
          className={landingStyles.img}
          src="https://storage.googleapis.com/fat-cats-nft-test-images/fat%20cat.jpeg"
          alt="Fat Cat"
        ></img>
      </div>
    </div>
  );
}
