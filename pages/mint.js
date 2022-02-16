import { useEffect, useState } from "react";
import { ethers, providers } from "ethers";
import { providerOptions } from "../helpers/providerOptions";
import mintExampleAbi from "../mintExampleAbi.json";
import Web3Modal from "web3modal";
import Header from "../components/header";

const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

export default function Mint() {
  const [minted, setMinted] = useState(0);
  const [available, setAvailable] = useState(0);

  // Connecting wallet provider
  const [provider, setProvider] = useState();

  async function connectAccounts() {
    if (!provider) {
      const web3Modal = new Web3Modal({
        providerOptions // required
      });
      await web3Modal.clearCachedProvider();
      setProvider(await connect(web3Modal));
    }
  }

  async function connect(web3Modal) {
    const provider = await web3Modal.connect();
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      console.log(accounts);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      console.log(chainId);
    });

    // Subscribe to provider connection
    provider.on("connect", (info) => {
      console.log(info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      console.log(error);
    });
    return new providers.Web3Provider(provider, "any");
  }

  // Minting NFTs
  const [mintQuantity, setMintQuantity] = useState(1);

  async function handleMint() {
    if (provider) {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        mintExampleAbi.abi,
        signer
      );
      try {
        const amountETH = 0.1 * mintQuantity;
        const response = await contract.mintNFTs(mintQuantity, { value: ethers.utils.parseEther(amountETH.toString()) });
        console.log("response: ", response);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }

  return (
    <div>
      <Header />
      This is how create a mint button
      <div>
        {!provider && (
          <button onClick={() => connectAccounts()}>Connect Wallet</button>
        )}
      </div>
      <div>
        {provider && (
          <div>
            <button onClick={() => setMintQuantity(mintQuantity - 1)}>-</button>
            {mintQuantity}
            <button onClick={() => setMintQuantity(mintQuantity + 1)}>+</button>
            <button onClick={handleMint}>Mint</button>
          </div>
        )}
      </div>
    </div>
  );
}
