import React from "react";

export const WalletContext = React.createContext({
    setShowConnectWallet: () => { },
    setShowDisconnectWallet: () => { },
    provider: null,
    chainId: null,
    signer: null,
    address: null,
    balance: null,
});