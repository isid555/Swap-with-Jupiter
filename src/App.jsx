import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletDisconnectButton, WalletModalProvider, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import WalletBalance from "./components/WalletBalance.jsx";
import TokenMetadata from "./components/TokenMetadata.jsx";
import SolanaDashboard from "./components/SolanaDashboard.jsx";
import "./App.css"
import SwapInterface from "./components/SwapInterface.jsx";
import {NavBar} from "./components/NavBar.jsx";


function App() {

  return (
    <>
      <ConnectionProvider endpoint={"https://api.mainnet-beta.solana.com"} >
        <WalletProvider wallets={[]} autoConnect >

            <WalletModalProvider>

                <div>

                    <NavBar/>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mt-8">
                        <WalletBalance/>
                        <SwapInterface/>

                    </div>

                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mt-8">
                        <TokenMetadata/>
                        <SolanaDashboard/>
                    </div>




                </div>

            </WalletModalProvider>


        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
