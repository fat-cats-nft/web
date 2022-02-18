import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

const defaultProvider = new ethers.providers.AlchemyProvider(process.env.NEXT_PUBLIC_ETHEREUM_NETWORK, process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: "1a58538598524cb98d6ad2b628a13d2d" // required
        }
    }
};

module.exports = {
    providerOptions,
    defaultProvider,
}