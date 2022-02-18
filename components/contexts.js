import React from "react";

export const WalletContext = React.createContext({
    setShowConnectWallet: () => { },
    setShowDisconnectWallet: () => { },
    provider: null,
    address: null,
});