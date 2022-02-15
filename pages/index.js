import { useEffect, useState } from "react";
import { ethers, providers } from "ethers";
import mintExampleAbi from "../mintExampleAbi.json";
import Web3Modal from "web3modal";
import { providerOptions } from "../helpers/providerOptions";

const contractAddress = "0xc09baFA1d082a98f8C9B0abB499CbA7aF672f44b";

export default function App() {
  // Connecting
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
    return new providers.Web3Provider(provider);
  }

  // Minting
  const [mintQuantity, setMintQuantity] = useState(1);

  async function handleMint() {
    if (provider) {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
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
    <div className="App">
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
