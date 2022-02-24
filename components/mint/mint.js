import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import mintExampleAbi from "../../abis/mintExampleAbi.json";
import { WalletContext } from "../contexts";
import commonStyles from "../common.module.css";
import mintStyles from "./mint.module.css";

const contractAddress = "0xc09baFA1d082a98f8C9B0abB499CbA7aF672f44b";
const abi = mintExampleAbi.abi;

export default function Mint() {
  const { setShowConnectWallet, provider, address } = useContext(WalletContext);
  const [minted, setMinted] = useState(0);
  const [available, setAvailable] = useState(0);

  // Get Mint status on page load
  useEffect(() => {
    if (provider && abi && !minted) {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const getMintStatus = async () => {
        const _minted = await contract.totalSupply();
        const _available = await contract.MAX_SUPPLY();
        return {
          "minted": _minted.toNumber(),
          "available": _available.toNumber(),
        }
      }
      getMintStatus()
        .then(result => {
          setMinted(result.minted);
          setAvailable(result.available);
        })
        .catch(console.error);
    }
  }, [provider, abi, minted])

  // Minting NFTs
  const [mintQuantity, setMintQuantity] = useState(1);

  async function mint() {
    if (address) {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        abi,
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
    <div className={commonStyles.body}>
      <div className={commonStyles.container}>
        <div className={commonStyles.title}>Fat Cats</div>
        <div className={commonStyles.subtitle}>Mint Info</div>
      </div>
      <div className={commonStyles.container}>
        <div className={mintStyles.bodyContainer}>
          {minted} of {available} minted
        </div>
      </div>
      <div className={commonStyles.container}>
        <div className={commonStyles.buttonContainer}>
          <div>
            {!address && (
              <button className={commonStyles.button1} onClick={() => setShowConnectWallet(true)}>Connect Wallet</button>
            )}
          </div>
          <div>
            {address && (
              <div>
                <button className={commonStyles.button} onClick={() => setMintQuantity(mintQuantity - 1)}>-</button>
                {mintQuantity}
                <button className={commonStyles.button} onClick={() => setMintQuantity(mintQuantity + 1)}>+</button>
                <button className={commonStyles.button2} onClick={mint}>Mint</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
