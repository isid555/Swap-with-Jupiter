import React from "react";
import useSolanaData from "../hooks/useSolanaData";

const walletAddress = "AJD4eVPKZ9jX63wwdy6Sf8K1BYcQ6KyDSTinPbidDzE2"; // Replace with actual address

const tokensA = [
    { address: "A5jm259qa9F6MGTxybFAsTa7fUAsbWmuUKmP6Y4gpump", balance: 1 },
    { address: "68yeZ756U5Wvxcj5GTRxHhiSXZvdqetUHWbAoi2KvdPP", balance: 2 },
    { address: "CdfRUhtND1b7hYJd8he5tCeW3GPCJmqrZzrh7rvEpump", balance: 3 },
];

// using tokenA?

const SolanaDashboard = () => {
    const { solBalance, tokenBalances, prices, loading, error } = useSolanaData(walletAddress, tokensA , 5000);

    if (loading) return <p>Loading wallet data...</p>;
    if (error) return <p>Error: {error}</p>;



    return (
        <div>
            <h2>Solana Wallet Overview</h2>
            <p><strong>SOL Balance:</strong> {solBalance} SOL</p>
            <p><strong>SOL Price:</strong> ${prices.solPrice}</p>
            <h3>Token Balances & Prices</h3>
            <ul>
                {/*Change it to original tokens in mainnet , tokenBalances*/}
                {tokensA.map((token) => (
                    <li key={token.address}>
                        Mint: {token.address} | Balance: {token.balance} | Price: ${prices.tokenPrices[token.address] || "N/A"}  | Amount (in USD) : $ {token.balance * prices.tokenPrices[token.address]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SolanaDashboard;
