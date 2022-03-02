import { useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

import mintExampleAbi from '../../abis/mintExampleAbi.json';
import { WalletContext } from '../contexts';
import commonStyles from '../common.module.css';
import mintStyles from './mint.module.css';

const contracts = {
  abi: mintExampleAbi.abi,
  chains: {
    '0x4': '0xc09baFA1d082a98f8C9B0abB499CbA7aF672f44b',
  },
};

export default function Mint() {
  const { setShowConnectWallet, provider, chainId, signer, address, balance } =
    useContext(WalletContext);
  const [abi, setAbi] = useState(contracts.abi);
  const [contractAddress, setContractAddress] = useState(contracts.chains[chainId]);
  const [minted, setMinted] = useState(0);
  const [available, setAvailable] = useState(0);
  const [disableMint, setDisableMint] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mintQuantity, setMintQuantity] = useState(1);

  // Get Mint status on page load
  useEffect(() => {
    if (provider && abi && contractAddress && !minted) {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const getMintStatus = async () => {
        const _minted = await contract.totalSupply();
        const _available = await contract.MAX_SUPPLY();
        return {
          minted: _minted.toNumber(),
          available: _available.toNumber(),
        };
      };
      getMintStatus()
        .then((result) => {
          setMinted(result.minted);
          setAvailable(result.available);
        })
        .catch(console.error);
    }
  }, [provider, abi, contractAddress, minted]);

  // Error handling
  function handleErrors() {
    // Adjust mint ability
    if (!contracts.chains[chainId]) {
      setDisableMint(true);
      setErrorMessage('Incompatible chain. Switch to Rinkeby.');
    } else {
      if (balance && mintQuantity) {
        const bigNumberAmountETH = ethers.utils.parseEther((mintQuantity * 0.1).toString());
        if (balance.gte(bigNumberAmountETH)) {
          setDisableMint(false);
          setErrorMessage('');
        } else {
          setDisableMint(true);
          setErrorMessage('Insufficient ETH in wallet.');
        }
      }
    }
  }

  // Adjust state based on chainId
  useEffect(() => {
    // Adjust contract address
    if (chainId) {
      setContractAddress(contracts.chains[chainId]);
    }
  }, [chainId]);

  // Handle mint errors
  useEffect(() => {
    if (chainId && mintQuantity && balance) {
      handleErrors();
    }
  }, [chainId, mintQuantity, balance]);

  // Minting NFTs
  async function mint() {
    if (address) {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const amountETH = 0.1 * mintQuantity;
        const response = await contract.mintNFTs(mintQuantity, {
          value: ethers.utils.parseEther(amountETH.toString()),
        });
        console.log('response: ', response);
      } catch (err) {
        console.log('error: ', err);
        setErrorMessage(err.error.message);
        setDisableMint(true);
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
              <button className={commonStyles.walletBtn} onClick={() => setShowConnectWallet(true)}>
                Connect Wallet
              </button>
            )}
          </div>
          <div>
            {address && (
              <div>
                <button onClick={() => setMintQuantity(mintQuantity - 1)}>-</button>
                {mintQuantity}
                <button onClick={() => setMintQuantity(mintQuantity + 1)}>+</button>
                <button className={commonStyles.walletBtn} onClick={mint} disabled={disableMint}>
                  Mint
                </button>
                <div>{errorMessage}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
