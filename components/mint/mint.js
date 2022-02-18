import { useState, useContext } from "react";
import { ethers } from "ethers";
import mintExampleAbi from "../../abis/mintExampleAbi.json";
import { WalletContext } from "../contexts";

const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

export default function Mint() {
  const { setShowConnectWallet, provider, address } = useContext(WalletContext);

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
      This is how create a mint button
      <div>
        {!address && (
          <button onClick={() => setShowConnectWallet(true)}>Connect Wallet</button>
        )}
      </div>
      <div>
        {address && (
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
