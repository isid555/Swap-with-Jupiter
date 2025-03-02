import React from "react";
import useSolanaData from "../hooks/useSolanaData";
import { useWallet } from "@solana/wallet-adapter-react";
import useTokenBalance from "../hooks/useTokenBalance.js";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

const SolanaDashboard = () => {
    const wallet = useWallet();
    const { tokens } = useTokenBalance(wallet.publicKey, 0);
    const { solBalance, tokenBalances, prices, loading, error } = useSolanaData(wallet.publicKey, tokens, 5000);

    if (loading) return <CircularProgress className="text-green-500" />;
    if (error) return <Typography className="text-red-500">Error: {error}</Typography>;

    return (
        <Card className="max-w-3xl mx-auto mt-6 bg-gray-800 text-white shadow-xl rounded-lg p-6">
            <CardContent>
                <Typography variant="h5" className="text-green-400 font-bold mb-4">Solana Wallet Overview</Typography>
                <Typography variant="h6" className="text-yellow-300">SOL Balance: <span className="font-semibold">{solBalance} SOL</span></Typography>
                <Typography variant="h6" className="text-blue-300 mt-2">SOL Price: <span className="font-semibold">${prices.solPrice}</span></Typography>

                <Typography variant="h6" className="text-green-400 mt-4">Token Balances & Prices</Typography>
                <ul className="space-y-4 mt-2">
                    {tokenBalances.map((token) => (
                        <li key={token.address} className="border-b border-gray-600 pb-4">
                            <Typography variant="body1" className="text-yellow-300">Mint: {token.mintAddress}</Typography>
                            <Typography variant="body2" className="text-gray-400">Balance: {token.balance}</Typography>
                            <Typography variant="body2" className="text-blue-300">Price: ${prices.tokenPrices[token.mintAddress] || "N/A"}</Typography>
                            <Typography variant="body2" className="text-green-300">Amount (in USD): ${token.balance * prices.tokenPrices[token.mintAddress] || "N/A"}</Typography>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default SolanaDashboard;