import React, { useState } from "react";
import { useSwap } from "../hooks/useSwap";
import { useWallet } from "@solana/wallet-adapter-react";
import {
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import useTokenBalance from "../hooks/useTokenBalance.js";
import useTokenPrices from "../hooks/useTokenPrices.js";
import useMultipleTokenMetadata from "../hooks/useMultipleTokenMetadata.js";
import TransactionPopup from "./TweetTransaction.jsx";
import "@fontsource/orbitron";

const shimmerAnimation = `
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
@keyframes glow {
  0%, 100% { text-shadow: 0 0 5px #ccc, 0 0 10px #aaa; }
  50% { text-shadow: 0 0 15px #fff, 0 0 25px #eee; }
}
`;

const SwapInterface = () => {
    const { publicKey } = useWallet();
    const [selectedToken, setSelectedToken] = useState("");
    const [merchantAddress, setMerchantAddress] = useState("");
    const [outAmount, setOutAmount] = useState("");
    const [slippageBps, setSlippageBps] = useState("50");

    const { tokens = [] } = useTokenBalance(publicKey, 5000) || {};
    const { prices = {} } = useTokenPrices(1, tokens, 5000) || {};
    const { metadataList = [] } = useMultipleTokenMetadata(tokens) || {};
    const { swapTokens, loading, error, transactionUrl } = useSwap(
        selectedToken,
        outAmount,
        slippageBps,
        merchantAddress
    );

    return (
        <Box>
            <style>{shimmerAnimation}</style>

            <Box
                sx={{
                    fontFamily: "'Orbitron', sans-serif",
                    width: "100%", // or "100%" depending on your previous layout
                    maxWidth: "1000px",
                    mx: "auto",
                    p: 4,
                    mt: 5,
                    borderRadius: 4,
                    background: `
            linear-gradient(
                120deg,
                #1a1a1a 0%,
                #2b2b2b 30%,
                #1a1a1a 60%,
                #2b2b2b 100%
            )
        `,
                    backgroundSize: "1000px 100%",
                    animation: "shimmer 8s linear infinite",
                    boxShadow: "0 0 30px rgba(255,255,255,0.2)",
                    border: "2px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    backdropFilter: "blur(15px)",
                }}
            >

            <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        mb: 3,
                        fontSize: { xs: "1.7rem", sm: "2rem", md: "2.2rem" },
                        background: "linear-gradient(to right, #ffffff, #bbbbbb, #eeeeee)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "glow 2s ease-in-out infinite",
                        textAlign: "center",
                    }}
                >
                    = Swap Tokens =
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                        Select Token
                    </Typography>
                    <Select
                        value={selectedToken}
                        onChange={(e) => setSelectedToken(e.target.value)}
                        fullWidth
                        size="medium"
                        sx={{
                            background: "#1e1e1e",
                            color: "#fff",
                            borderRadius: 2,
                            "& .MuiSelect-icon": { color: "#ccc" },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#999",
                            },
                        }}
                    >
                        {tokens.length > 0 ? (
                            tokens.map((token) => {
                                const tokenMeta =
                                    metadataList.find(
                                        (m) => m.address === token.mintAddress
                                    ) || {};
                                return (
                                    <MenuItem
                                        key={token.mintAddress}
                                        value={token.mintAddress}
                                    >
                                        <img
                                            src={tokenMeta.logoURI || ""}
                                            alt={tokenMeta.symbol || ""}
                                            className="w-6 h-6 inline-block mr-2"
                                        />
                                        {tokenMeta.symbol || "Unknown"}
                                    </MenuItem>
                                );
                            })
                        ) : (
                            <MenuItem disabled>No tokens available</MenuItem>
                        )}
                    </Select>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                        Merchant Address
                    </Typography>
                    <TextField
                        value={merchantAddress}
                        onChange={(e) => setMerchantAddress(e.target.value)}
                        fullWidth
                        placeholder="Enter merchant's address"
                        sx={{
                            input: {
                                color: "#eee",
                                fontSize: "1rem",
                            },
                            background: "#1e1e1e",
                            borderRadius: 2,
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#999",
                            },
                        }}
                    />
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                        Amount in USDC
                    </Typography>
                    <TextField
                        type="number"
                        value={outAmount}
                        onChange={(e) => setOutAmount(e.target.value)}
                        fullWidth
                        placeholder="Enter amount"
                        inputProps={{ min: 0.000001 }}
                        sx={{
                            input: {
                                color: "#eee",
                                fontSize: "1rem",
                            },
                            background: "#1e1e1e",
                            borderRadius: 2,
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#999",
                            },
                        }}
                    />
                </Box>

                <Button
                    variant="contained"
                    onClick={swapTokens}
                    disabled={loading || !publicKey}
                    sx={{
                        width: "100%",
                        py: 1.5,
                        fontWeight: "bold",
                        fontSize: "1rem",
                        borderRadius: 2,
                        color: "#000",
                        background: "linear-gradient(135deg, #e5e5e5, #bdbdbd, #f2f2f2)",
                        backgroundSize: "400% 400%",
                        animation: "shimmer 6s ease infinite",
                        boxShadow: "0 0 15px rgba(255,255,255,0.4)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #fff, #ccc, #eaeaea)",
                            boxShadow: "0 0 20px rgba(255,255,255,0.6)",
                        },
                    }}
                >
                    {loading ? "Swapping..." : "Swap Now"}
                </Button>

                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}

                {transactionUrl && (
                    <Box
                        sx={{
                            mt: 3,
                            p: 2,
                            background: "rgba(0, 255, 0, 0.1)",
                            borderRadius: 2,
                            color: "#fff",
                            textAlign: "center",
                            border: "1px solid #4caf50",
                        }}
                    >
                        ✅ Swap Successful! View on{" "}
                        <a
                            href={transactionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: "underline",
                                color: "#4caf50",
                            }}
                        >
                            Solscan
                        </a>
                        <TransactionPopup transactionUrl={transactionUrl} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default SwapInterface;
