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
  const [minted, setMinted] = useState(0);
  const [available, setAvailable] = useState(0);
  const [disableMint, setDisableMint] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mintQuantity, setMintQuantity] = useState(1);
  const [mintPrice, setMintPrice] = useState();

  // Get Mint status on page load
  useEffect(() => {
    setMintData();
  }, [provider, chainId]);

  const setMintData = async () => {
    try {
      const contractAddress = contracts.chains[chainId];
      if (provider && contractAddress && chainId) {
        const contract = new ethers.Contract(contractAddress, contracts.abi, provider);
        const getMintStatus = async () => {
          const _minted = await contract.totalSupply();
          const _available = await contract.MAX_SUPPLY();
          const _mintPrice = await contract.PRICE();
          return {
            minted: _minted.toNumber(),
            available: _available.toNumber(),
            mintPrice: _mintPrice,
          };
        };
        getMintStatus()
          .then((result) => {
            setMinted(result.minted);
            setAvailable(result.available);
            setMintPrice(result.mintPrice);
            setDisableMint(false);
            setErrorMessage('');
          })
          .catch(console.error);
      } else {
        setMinted(0);
        setAvailable(0);
        setMintPrice(ethers.BigNumber.from(0));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle mint errors
  useEffect(() => {
    if (chainId && mintQuantity && balance) {
      handleErrors();
    }
  }, [chainId, mintQuantity, balance]);

  // Error handling
  function handleErrors() {
    // Adjust mint ability
    if (!contracts.chains[chainId]) {
      setDisableMint(true);
      setErrorMessage('Incompatible chain. Switch to Rinkeby.');
    } else {
      if (balance && mintQuantity && mintPrice) {
        const bigNumberAmountETH = mintPrice.mul(mintQuantity);
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

  // Minting NFTs
  async function mint() {
    if (address) {
      const contractAddress = contracts.chains[chainId];
      const contract = new ethers.Contract(contractAddress, contracts.abi, signer);
      try {
        const mintAmountETH = mintPrice.mul(mintQuantity);
        console.log(mintAmountETH);
        console.log(mintQuantity);
        const response = await contract.mintNFTs(mintQuantity, {
          value: mintAmountETH,
        });
        console.log('response: ', response);
      } catch (err) {
        if (err.error) {
          setErrorMessage(err.error.message);
          setDisableMint(true);
        } else {
          console.error(err);
        }
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
              <button className={commonStyles.button1} onClick={() => setShowConnectWallet(true)}>
                Connect Wallet
              </button>
            )}
          </div>
          <div>
            {address && (
              <div>
                <button
                  className={commonStyles.button}
                  onClick={() => setMintQuantity(mintQuantity - 1)}
                >
                  -
                </button>
                {mintQuantity}
                <button
                  className={commonStyles.button}
                  onClick={() => setMintQuantity(mintQuantity + 1)}
                >
                  +
                </button>
                <button className={commonStyles.button2} onClick={mint} disabled={disableMint}>
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
