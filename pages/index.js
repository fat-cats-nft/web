import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/header/header";
import Landing from "../components/landing/landing";
import Mint from "../components/mint/mint";
import { providers } from "ethers";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { defaultProvider, providerOptions } from "../providers";
import { WalletContext } from "../components/contexts/wallet";


export default function App() {
  // Connecting wallet provider
  const [connectWallet, setConnectWallet] = useState(false);
  const [disconnectWallet, setDisconnectWallet] = useState(false);
  const [provider, setProvider] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    const web3Modal = new Web3Modal({
      providerOptions, // required
      cacheProvider: true,
    });
    if (web3Modal.cachedProvider) {

      const provisionProvider = async () => {
        const _connection = await web3Modal.connectTo(web3Modal.cachedProvider);
        const _provider = new ethers.providers.Web3Provider(_connection, "any");
        const _signer = _provider.getSigner();
        const _address = await _signer.getAddress();
        setProvider(_provider);
        setAddress(_address);
      }
      provisionProvider()
        .catch(console.error)
    } else {
      console.log(defaultProvider);
      setProvider(defaultProvider);
    }
  }, [])

  useEffect(() => {
    if (connectWallet) {
      const walletConnect = async () => {
        const web3Modal = new Web3Modal({
          providerOptions,
          cachedProvider: true,
        });
        const _connection = await web3Modal.connect();
        const _provider = new ethers.providers.Web3Provider(_connection, "any");
        const _signer = _provider.getSigner();
        const _address = await _signer.getAddress();
        console.log(_provider);
        console.log(_signer);
        setProvider(_provider);
        setAddress(_address);
      }
      walletConnect()
        .catch(console.error)
      setConnectWallet(false);
    }
  }, [connectWallet])

  // useEffect(async () => {
  //   if (disconnectWallet) {
  //     const deprovisionProvider = async () => {
  //       const web3Modal = new Web3Modal({
  //         providerOptions // required
  //       });
  //       await web3Modal.clearCachedProvider();
  //       setProvider(defaultProvider);
  //       setSigner(null);
  //       setDisconnectWallet(false);
  //     }
  //     deprovisionProvider()
  //       .catch(console.error);
  //   }
  // }, [disconnectWallet])

  return (
    <WalletContext.Provider value={{ setConnectWallet, setDisconnectWallet, provider, address }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/mint" element={<Mint />}></Route>
        </Routes>
      </Router>
    </WalletContext.Provider>
  );
}
