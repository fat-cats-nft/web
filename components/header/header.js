import { Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';

import styles from './header.module.css';
import { WalletContext } from '../contexts';
import formatAddress from '../../helpers';

export default function Header() {
  const router = useRouter();
  const { setShowConnectWallet, setShowDisconnectWallet, address } = useContext(WalletContext);

  return (
    <header className={styles.header}>
      <Flex justifyContent="space-between">
        <Flex>
          <div
            className={classnames(styles.link, {
              [styles['link-active']]: router.pathname === '/',
            })}
          >
            <Link href="/">Home</Link>
          </div>
          <div
            className={classnames(styles.link, {
              [styles['link-active']]: router.pathname === '/mint',
            })}
          >
            <Link href="/mint">Mint</Link>
          </div>
        </Flex>
        {!address && <div onClick={() => setShowConnectWallet(true)}>Connect Wallet</div>}
        {address && (
          <div onClick={() => setShowDisconnectWallet(true)}>{formatAddress(address)}</div>
        )}
      </Flex>
    </header>
  );
}
