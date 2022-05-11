import { ChakraProvider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import '../styles/globals.css';
import Header from '../components/header/header';
import DisconnectWallet from '../components/wallet/wallet';
import { defaultProvider, providerOptions } from '../providers';
import { WalletContext } from '../components/contexts';

function App({ Component, pageProps }) {
  // Connecting wallet provider
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showDisconnectWallet, setShowDisconnectWallet] = useState(false);
  const [disconnectWallet, setDisconnectWallet] = useState(false);
  const [provider, setProvider] = useState();
  const [chainId, setChainId] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState();

  // Load provider on page load
  useEffect(() => {
    try {
      setEventListeners(window.ethereum);
      const _provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      setContext(_provider);
    } catch (err) {
      setProvider(defaultProvider);
    }
  }, []);

  // Set event listeners for provider
  function setEventListeners(ethereum) {
    // Subscribe to accounts change
    ethereum.on('accountsChanged', (accounts) => {
      console.log('Accounts Changed: ', accounts);
      if (accounts.length > 0) {
        setAddress(accounts[0]);
      } else {
        setAddress(null);
      }
    });

    // Subscribe to chainId change
    ethereum.on('chainChanged', (_chainId) => {
      console.log('Chain changed: ', _chainId);
      if (typeof _chainId == 'number') {
        setChainId("0x" + _chainId.toString());
      } else {
        setChainId(_chainId);
      }
    });

    // Subscribe to provider connection
    ethereum.on('connect', (info) => {
      console.log('Connect: ', info);
    });

    // Subscribe to provider disconnection
    ethereum.on('disconnect', (info) => {
      console.log('Disconnect: ', info);
    });
  }

  // Set context values
  async function setContext(_provider) {
    setProvider(_provider);
    try {
      const _signer = _provider.getSigner();
      setSigner(_signer);

      const _network = await _provider.getNetwork();
      const _chainId = "0x" + _network.chainId.toString()
      setChainId(_chainId);

      const _address = await _signer.getAddress();
      setAddress(_address);

      const _balance = await _signer.getBalance();
      setBalance(_balance);
    } catch (error) {
      console.error(error);
      setProvider(defaultProvider);
      setSigner(null);
      setAddress(null);
      setBalance(null);
      setChainId(null);
    }
  }

  useEffect(() => {
    if (showConnectWallet) {
      const walletConnect = async () => {
        const web3Modal = new Web3Modal({
          providerOptions,
          cachedProvider: true,
        });
        const _connection = await web3Modal.connect();
        const _provider = new ethers.providers.Web3Provider(_connection, 'any');
        setContext(_provider);
      };
      walletConnect().catch(console.error);
      setShowConnectWallet(false);
    }
  }, [showConnectWallet]);

  useEffect(async () => {
    if (disconnectWallet) {
      console.log("DISCONNECT");
      const deprovisionProvider = async () => {
        const web3Modal = new Web3Modal({
          providerOptions,
          cachedProvider: true,
        });
        await web3Modal.clearCachedProvider();
        setProvider(defaultProvider);
        setSigner(null);
        setAddress(null);
        setBalance(null);
        setShowDisconnectWallet(false);
        setDisconnectWallet(false);
      };
      deprovisionProvider().catch(console.error);
    }
  }, [disconnectWallet]);

  return (
    <ChakraProvider>
      <WalletContext.Provider
        value={{
          setShowConnectWallet,
          setShowDisconnectWallet,
          provider,
          chainId,
          signer,
          address,
          balance,
        }}
      >
        <Header />
        <DisconnectWallet
          showDisconnectWallet={showDisconnectWallet}
          setDisconnectWallet={setDisconnectWallet}
        />
        <div>{typeof window === 'undefined' ? null : <Component {...pageProps} />}</div>;
      </WalletContext.Provider>
    </ChakraProvider>
  );
}

export default App;
