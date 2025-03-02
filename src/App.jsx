import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletDisconnectButton, WalletModalProvider, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import WalletBalance from "./components/WalletBalance.jsx";
import TokenMetadata from "./components/TokenMetadata.jsx";
import SolanaDashboard from "./components/SolanaDashboard.jsx";
import "./App.css"


function App() {

  return (
    <>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"} >
        <WalletProvider wallets={[]} autoConnect >
          <WalletModalProvider >
            <WalletMultiButton/>
            <WalletDisconnectButton/>
            <div>
              <div className="text-lg text-green-600 bg-red-500">
                Hello Web3 world
              </div>

              <WalletBalance/>
              <TokenMetadata/>
              <SolanaDashboard/>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
