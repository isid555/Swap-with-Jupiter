import React from "react";
import useTokenBalance from "../hooks/useTokenBalance";
import { useWallet } from "@solana/wallet-adapter-react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

const WalletBalance = () => {
    const wallet = useWallet();
    const { solBalance, tokens, loading, error } = useTokenBalance(wallet.publicKey, 0);

    if (loading) return <CircularProgress className="text-green-500" />;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <Card className="max-w-md mx-auto mt-6 bg-gray-800 text-white shadow-xl rounded-lg p-6">
            <CardContent>
                <Typography variant="h5" className="text-green-400 font-bold mb-4">
                    Wallet Balance
                </Typography>
                <Typography variant="h6" className="text-yellow-300">
                    SOL Balance: <span className="font-semibold">{solBalance} SOL</span>
                </Typography>
                <Typography variant="h6" className="text-blue-300 mt-4">Token Balances:</Typography>
                <ul className="mt-2">
                    {tokens.length > 0 ? (
                        tokens.map((token) => (
                            <li key={token.mintAddress} className="text-gray-300">
                                {token.mintAddress}: <span className="font-semibold">{token.balance} tokens</span>
                            </li>
                        ))
                    ) : (
                        <Typography className="text-red-400">No SPL tokens found.</Typography>
                    )}
                </ul>
            </CardContent>
        </Card>
    );
};

export default WalletBalance;
