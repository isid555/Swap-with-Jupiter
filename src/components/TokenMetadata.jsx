import React from "react";
import useMultipleTokenMetadata from "../hooks/useMultipleTokenMetadata";
import useTokenBalance from "../hooks/useTokenBalance.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

const TokenMetadata = () => {
    const wallet = useWallet();
    const { tokens } = useTokenBalance(wallet.publicKey, 0);
    const { metadataList, loading, error } = useMultipleTokenMetadata(tokens);

    if (loading) return <CircularProgress className="text-green-500" />;
    if (error) return <Typography className="text-red-500">Error: {error}</Typography>;
        if(!wallet) return <Typography>Connect to wallet</Typography>
    return (
        <Card className="max-w-2xl mx-auto mt-6 bg-gray-800 text-white shadow-xl rounded-lg p-6">
            <CardContent>
                <Typography variant="h5" className="text-green-400 font-bold mb-4">Solana Token Metadata</Typography>
                <ul className="space-y-4">
                    {metadataList.map((metadata) => (
                        <li key={metadata.address} className="flex items-center gap-4 border-b border-gray-600 pb-4">
                            {metadata.logoURI && (
                                <img src={metadata.logoURI} alt={metadata.name} width="50" className="rounded-full" />
                            )}
                            <div>
                                <Typography variant="h6" className="text-yellow-300">{metadata.name} ({metadata.symbol})</Typography>
                                <Typography variant="body2" className="text-gray-400">Mint Address: {metadata.address}</Typography>
                                <Typography variant="body2" className="text-blue-300">Decimals: {metadata.decimals}</Typography>
                                <Typography variant="body2" className="text-green-300">Balance: {tokens.balance}</Typography>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default TokenMetadata;