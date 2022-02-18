import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/header/header";
import DisconnectWallet from "../components/wallet/wallet";
import Landing from "../components/landing/landing";
import Mint from "../components/mint/mint";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { defaultProvider, providerOptions } from "../providers";
import { WalletContext } from "../components/contexts";

const defaultNetwork = 4;

export default function App() {
  // Connecting wallet provider
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showDisconnectWallet, setShowDisconnectWallet] = useState(false);
  const [disconnectWallet, setDisconnectWallet] = useState(false);
  const [provider, setProvider] = useState();
  const [address, setAddress] = useState();

  function loadProvider(providerInput) {
    const _provider = new ethers.providers.Web3Provider(providerInput);
    if (_provider) {
      setProvider(_provider);
      const walletConnect = async () => {
        const _signer = _provider.getSigner();
        const _address = await _signer.getAddress();
        return _address
      }
      walletConnect()
        .then(result => {
          setAddress(result);
        })
        .catch(console.error);
    } else {
      setProvider(defaultProvider);
    }
    return
  }

  useEffect(() => {
    if (window.ethereum) {
      if (window.ethereum.networkVersion != defaultNetwork) {
        const switchNetwork = async () => {
          await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x4' }] });
          loadProvider(window.ethereum);
        }
        switchNetwork()
          .catch(console.error);
      } else {
        loadProvider(window.ethereum);
      }
    } else {
      setProvider(defaultProvider);
    }
  }, [])

  useEffect(() => {
    if (showConnectWallet) {
      const walletConnect = async () => {
        const web3Modal = new Web3Modal({
          providerOptions,
          cachedProvider: true,
        });
        const _connection = await web3Modal.connect();
        const _provider = new ethers.providers.Web3Provider(_connection);
        const _signer = _provider.getSigner();
        const _address = await _signer.getAddress();
        setProvider(_provider);
        setAddress(_address);
      }
      walletConnect()
        .catch(console.error)
      setShowConnectWallet(false);
    }
  }, [showConnectWallet])

  useEffect(async () => {
    if (disconnectWallet) {
      const deprovisionProvider = async () => {
        const web3Modal = new Web3Modal({
          providerOptions,
          cachedProvider: true,
        });
        await web3Modal.clearCachedProvider();
        setProvider(defaultProvider);
        setAddress(null);
        setShowDisconnectWallet(false);
        setDisconnectWallet(false);
      }
      deprovisionProvider()
        .catch(console.error);
    }
  }, [disconnectWallet])

  return (
    <WalletContext.Provider value={{ setShowConnectWallet, setShowDisconnectWallet, provider, address }}>

      <Router>
        <Header />
        <DisconnectWallet showDisconnectWallet={showDisconnectWallet} setDisconnectWallet={setDisconnectWallet} />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/mint" element={<Mint />}></Route>
        </Routes>
      </Router>
    </WalletContext.Provider>
  );
}
