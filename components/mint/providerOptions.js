import WalletConnectProvider from "@walletconnect/web3-provider";

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
}