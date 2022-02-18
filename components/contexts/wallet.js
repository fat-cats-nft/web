import React from "react";

export const WalletContext = React.createContext({
    setConnectWallet: () => { },
    setDisconnectWallet: () => { },
    provider: null,
    address: null,
});