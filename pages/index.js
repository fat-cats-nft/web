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
  const [chainId, setChainId] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState();

  // Load provider on page load
  useEffect(() => {
    if (window.ethereum) {
      setEventListeners();
      const _provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      setContext(_provider);
    } else {
      setProvider(defaultProvider);
    }
  }, [])

  // Set event listeners for provider
  function setEventListeners() {
    if (window.ethereum) {
      // Subscribe to accounts change
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("Accounts Changed: ", accounts);
        const _provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        setContext(_provider);
      });

      // Subscribe to chainId change
      window.ethereum.on("chainChanged", (_chainId) => {
        console.log("Chain changed: ", _chainId);
        const _provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        setContext(_provider);
      });

      // Subscribe to provider connection
      window.ethereum.on("connect", (info) => {
        console.log("Connect: ", info);
      });

      // Subscribe to provider disconnection
      window.ethereum.on("disconnect", (info) => {
        console.log("Disconnect: ", info);
      });
    }
  }

  // Set context values
  async function setContext(_provider) {
    setProvider(_provider);
    if (window.ethereum) {
      const _chainId = await ethereum.request({ method: 'eth_chainId' });
      setChainId(_chainId);
      const _accounts = await ethereum.request({ method: 'eth_accounts' })
      console.log("Accounts: ", _accounts);
      if (_accounts.length > 0) {
        const _signer = _provider.getSigner();
        setSigner(_signer);
        const _address = await _signer.getAddress();
        setAddress(_address);
        const _balance = await _signer.getBalance();
        setBalance(_balance);
      } else {
        setSigner(null);
        setAddress(null);
        setBalance(null);
      }
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
        const _provider = new ethers.providers.Web3Provider(_connection, "any");
        setProvider(_provider);
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
        setShowDisconnectWallet(false);
        setDisconnectWallet(false);
      }
      deprovisionProvider()
        .catch(console.error);
    }
  }, [disconnectWallet])

  return (
    <WalletContext.Provider value={{ setShowConnectWallet, setShowDisconnectWallet, provider, chainId, signer, address, balance }}>

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
