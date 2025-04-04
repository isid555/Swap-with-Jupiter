import React from "react";
import useMultipleTokenMetadata from "../hooks/useMultipleTokenMetadata";
import useTokenBalance from "../hooks/useTokenBalance.js";
import { useWallet } from "@solana/wallet-adapter-react";
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
} from "@mui/material";

const TokenMetadata = () => {
    const wallet = useWallet();
    const { tokens } = useTokenBalance(wallet.publicKey, 0);
    const { metadataList, loading, error } = useMultipleTokenMetadata(tokens);

    return (
        <Card
            className="max-w-2xl mx-auto mt-6 shadow-xl rounded-2xl p-6 relative overflow-hidden font-orbitron"
            style={{
                backgroundColor: "#0d0d0d",
                border: "2px solid transparent",
                backgroundImage:
                    "linear-gradient(#0d0d0d, #0d0d0d), linear-gradient(130deg, #cccccc, #ffffff, #cccccc)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                color: "#e0e0e0",
                animation: "shimmer 8s linear infinite",
            }}
            elevation={0}
        >
            <CardContent className="relative z-10">
                <Typography
                    variant="h5"
                    sx={{
                        color: "#f5f5f5",
                        fontWeight: "bold",
                        textShadow: "0 0 6px rgba(255,255,255,0.5)",
                        fontFamily: "'Orbitron', sans-serif",
                        mb: 3,
                    }}
                >
                    Solana Token Metadata
                </Typography>

                {(loading || wallet || error) && (
                    <div className="flex justify-center items-center h-40">
                        {!wallet || loading && (
                            <Typography
                                sx={{
                                    color: "#cccccc",
                                    fontFamily: "'Orbitron', sans-serif",
                                    textShadow: "0 0 4px rgba(255,255,255,0.3)",
                                }}
                            >
                                Connect your wallet to view token metadata
                            </Typography>
                        )}
                        {loading && (
                            <CircularProgress
                                size={50}
                                sx={{
                                    color: "#aaaaff",
                                    animation: "pulse 1.5s ease-in-out infinite",
                                }}
                            />
                        )}
                        {error && (
                            <Typography
                                sx={{
                                    color: "#ff6666",
                                    fontFamily: "'Orbitron', sans-serif",
                                }}
                            >
                                Error: {error}
                            </Typography>
                        )}
                    </div>
                )}

                {!loading && metadataList.length > 0 && (
                    <ul className="space-y-4">
                        {metadataList.map((metadata) => (
                            <li
                                key={metadata.address}
                                className="flex items-center gap-4 border border-gray-700 rounded-xl p-4 bg-[#1a1a1a] hover:bg-[#2a2a2a] transition"
                                style={{
                                    boxShadow: "0 0 8px rgba(255,255,255,0.05)",
                                }}
                            >
                                {metadata.logoURI && (
                                    <img
                                        src={metadata.logoURI}
                                        alt={metadata.name}
                                        width="50"
                                        height="50"
                                        className="rounded-full border border-gray-600"
                                    />
                                )}
                                <div>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "#ffffff",
                                            fontFamily: "'Orbitron', sans-serif",
                                            textShadow: "0 0 4px rgba(255,255,255,0.5)",
                                        }}
                                    >
                                        {metadata.name} ({metadata.symbol})
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#bbbbbb" }}>
                                        Mint Address: {metadata.address}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#bbbbbb" }}>
                                        Decimals: {metadata.decimals}
                                    </Typography>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>

            {/* Animations */}
            <style>{`
                @keyframes shimmer {
                    0% {
                        background-position: -1000px 0;
                    }
                    100% {
                        background-position: 1000px 0;
                    }
                }

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

export default TokenMetadata;
