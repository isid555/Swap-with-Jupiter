import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
    WalletDisconnectButton,
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
    LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import WalletBalance from "./components/WalletBalance.jsx";
import TokenMetadata from "./components/TokenMetadata.jsx";
import SolanaDashboard from "./components/SolanaDashboard.jsx";
import SwapInterface from "./components/SwapInterface.jsx";
import { NavBar } from "./components/NavBar.jsx";
import backgroundImg from "./assets/img_2.png";
import "./App.css";
import Footer from "./components/Footer.jsx";

// Wallet adapters
const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network: "mainnet-beta" }),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter(),
];

function App() {
    return (
        <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div
                        className="min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-y-auto"
                        style={{ backgroundImage: `url(${backgroundImg})` }}
                    >
                        {/* Sticky Navbar with glass effect */}
                        <div className="sticky top-0 z-50 backdrop-blur-md bg-black/40">
                            <NavBar />
                        </div>

                        <div className="max-w-7xl mx-auto px-4 py-6">
                            {/* Swap Interface */}
                            <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
                                <SwapInterface />
                            </div>

                            {/* Token Metadata & Dashboard */}
                            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mt-10">
                                <div className="backdrop-blur-md bg-black/30 p-6 rounded-xl shadow-xl">
                                    <TokenMetadata />
                                </div>

                                <div className="backdrop-blur-md bg-black/30 p-6 rounded-xl shadow-xl">
                                    <SolanaDashboard />
                                </div>


                            </div>
                            <Footer/>
                        </div>
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;
