import React from "react";
import useSolanaData from "../hooks/useSolanaData";
import { useWallet } from "@solana/wallet-adapter-react";
import useTokenBalance from "../hooks/useTokenBalance.js";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

const SolanaDashboard = () => {
    const wallet = useWallet();
    const {
        tokens,
        loading: tokenLoading,
        error: tokenError,
        solBalance,
    } = useTokenBalance(wallet.publicKey, 0);
    const {
        tokenBalances,
        prices,
        loading: dataLoading,
        error: dataError,
    } = useSolanaData(wallet.publicKey, tokens, 5000);

    const loading = tokenLoading || dataLoading;
    const error = tokenError || dataError;

    return (
        <Card
            className="max-w-2xl mx-auto mt-6 shadow-2xl rounded-2xl p-6 relative overflow-hidden font-orbitron"
            style={{
                backgroundColor: "#0d0d0d",
                border: "2px solid transparent",
                backgroundImage:
                    "linear-gradient(#0d0d0d, #0d0d0d), linear-gradient(130deg, #cccccc, #ffffff, #cccccc)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                color: "#e0e0e0",
            }}
            elevation={0}
        >
            <CardContent className="relative z-10">
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        color: "#f5f5f5",
                        mb: 3,
                        textShadow: "0 0 6px rgba(255,255,255,0.4)",
                    }}
                >
                    Solana Wallet Overview
                </Typography>

                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <CircularProgress
                            size={50}
                            sx={{
                                color: "#aaaaff",
                                animation: "pulse 1.5s ease-in-out infinite",
                            }}
                        />
                    </div>
                )}

                {error && (
                    <Typography
                        sx={{
                            color: "#ff6666",
                            textAlign: "center",
                            fontWeight: 500,
                            mb: 2,
                        }}
                    >
                        Error: {error}
                    </Typography>
                )}

                {!loading && !error && (
                    <>
                        <Typography variant="h6" sx={{ color: "#ccc" }}>
                            SOL Balance:{" "}
                            <span className="text-gray-100 font-semibold">{solBalance} SOL</span>
                        </Typography>

                        <Typography variant="h6" sx={{ color: "#ccc", mt: 1 }}>
                            SOL Price:{" "}
                            <span className="text-gray-100 font-semibold">${prices.solPrice}</span>
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                mt: 4,
                                fontWeight: "bold",
                                color: "#ffffff",
                                textShadow: "0 0 4px rgba(255,255,255,0.5)",
                            }}
                        >
                            Token Balances & Prices
                        </Typography>

                        <ul className="space-y-4 mt-2">
                            {tokenBalances && tokenBalances.length > 0 ? (
                                tokenBalances.map((token) => {
                                    const tokenPrice = prices.tokenPrices[token.mintAddress];
                                    const usdValue = tokenPrice
                                        ? (token.balance * tokenPrice).toFixed(4)
                                        : "N/A";

                                    return (
                                        <li
                                            key={token.address}
                                            className="border border-gray-700 rounded-xl p-4 bg-[#1a1a1a] hover:bg-[#2a2a2a] transition"
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: "#ffffff",
                                                    fontWeight: 600,
                                                    textShadow: "0 0 3px rgba(255,255,255,0.3)",
                                                }}
                                            >
                                                Mint: {token.mintAddress}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#bbbbbb" }}>
                                                Balance: {token.balance}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#bbbbbb" }}>
                                                Price: ${tokenPrice || "N/A"}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#bbbbbb" }}>
                                                Amount (USD): ${usdValue}
                                            </Typography>
                                        </li>
                                    );
                                })
                            ) : (
                                <Typography className="text-red-400 mt-2">
                                    No SPL tokens found.
                                </Typography>
                            )}
                        </ul>
                    </>
                )}
            </CardContent>

            {/* Animations */}
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.6;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.1);
                    }
                }

                .font-orbitron {
                    font-family: 'Orbitron', sans-serif;
                }
            `}</style>
        </Card>
    );
};

export default SolanaDashboard;
