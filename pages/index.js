import mintExampleAbi from "../mintExampleAbi.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const contractAddress = "0xc09baFA1d082a98f8C9B0abB499CbA7aF672f44b";

export default function App() {
  // Connecting
  const [accounts, setAccounts] = useState([]);

  async function connectAccounts() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccounts(accounts);
      console.log(accounts);
    }
  }

  useEffect(() => {
    connectAccounts();
  }, [])

  // Minting
  const [mintQuantity, setMintQuantity] = useState(1);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
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
      {accounts.length && (
        <div>
          <button onClick={() => setMintQuantity(mintQuantity - 1)}>-</button>
          {mintQuantity}
          <button onClick={() => setMintQuantity(mintQuantity + 1)}>+</button>
          <button onClick={handleMint}>Mint</button>
        </div>
      )}
    </div>
  );
}
