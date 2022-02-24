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

export default function App() {
  // Connecting wallet provider 
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showDisconnectWallet, setShowDisconnectWallet] = useState(false);
  const [disconnectWallet, setDisconnectWallet] = useState(false);
  const [provider, setProvider] = useState();
  const [address, setAddress] = useState();
  const defaultNetwork = 4;

  // Load provider on page load
  useEffect(() => {
    if (window.ethereum) {
      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      setEventListeners();
      setProvider(_provider);
      const walletConnect = async () => {
        await connectWallet(_provider);
      }
      walletConnect()
        .catch(console.error);
    } else {
      setProvider(defaultProvider);
    }
  }, [])

  // Set event listeners for provider
  function setEventListeners() {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      // Subscribe to accounts change
      ethereum.on("accountsChanged", (accounts) => {
        console.log(accounts);
      });

      // Subscribe to chainId change
      ethereum.on("chainChanged", (chainId) => {
        console.log(chainId);
      });

      // Subscribe to provider connection
      ethereum.on("connect", (info) => {
        console.log(info);
      });

      // Subscribe to provider disconnection
      ethereum.on("disconnect", (error) => {
        console.log(error);
      });
    }
  }

  // Connect wallet
  async function connectWallet(_provider) {
    const _signer = _provider.getSigner();
    const _address = await _signer.getAddress();
    setAddress(_address);
  }


  useEffect(() => {
    if (showConnectWallet) {
      const walletConnect = async () => {
        const web3Modal = new Web3Modal({
          providerOptions,
          cachedProvider: true,
        });
        const _connection = await web3Modal.connect();
        const _provider = new ethers.providers.Web3Provider(_connection);
        setProvider(_provider);
        setEventListeners();
        await connectWallet(_provider);
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
    <WalletContext.Provider value={{ setShowConnectWallet, setShowDisconnectWallet, provider, address, defaultNetwork }}>

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
