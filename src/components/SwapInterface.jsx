import React, { useState } from "react";
import { useSwap } from "../hooks/useSwap";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import useTokenBalance from "../hooks/useTokenBalance.js";
import useTokenPrices from "../hooks/useTokenPrices.js";
import useMultipleTokenMetadata from "../hooks/useMultipleTokenMetadata.js";
import TransactionPopup from "./TweetTransaction.jsx";

const SwapInterface = () => {
    const { publicKey } = useWallet();
    const [selectedToken, setSelectedToken] = useState("");
    const [tokenQuantity, setTokenQuantity] = useState("");
    const [merchantAddress, setMerchantAddress] = useState("");
    const [outAmount, setOutAmount] = useState("");
    const [slippageBps, setSlippageBps] = useState("50"); // Default 0.5%

    const { tokens = [] } = useTokenBalance(publicKey, 5000) || {};
    const { prices = {} } = useTokenPrices(1, tokens, 5000) || {};
    const { metadataList = [] } = useMultipleTokenMetadata(tokens) || {};

    const [selectedTokenPrice , setselectedTokenPrice] = useState("")



    const { swapTokens, loading, error, transactionUrl } = useSwap(
        selectedToken,
        outAmount,
        slippageBps,
        merchantAddress
    );

    // const selectedTokenPrice = prices?.[selectedToken]?.price || 0;
    const totalValue = tokenQuantity * selectedTokenPrice;
    // const isValidSwap = totalValue >= outAmount;
        const isValidSwap = true;

    return (
        <div className="max-w-md mx-auto p-6 bg-white-300 rounded-xl shadow-md text-black mt-10">
            <h2 className="text-2xl font-bold text-center mb-4">Swap Tokens</h2>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-2">Select Token</label>
                <Select
                    value={selectedToken}
                    onChange={(e ) =>{
                        setSelectedToken(e.target.value)}}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                >
                    {tokens.length > 0 ? (
                        tokens.map((token) => {
                            const tokenMeta = metadataList.find(m => m.address === token.mintAddress) || {};
                            return (
                                <MenuItem key={token.mintAddress} value={token.mintAddress}>
                                    <img src={tokenMeta.logoURI || ""} alt={tokenMeta.symbol || ""} className="w-6 h-6 inline-block mr-2" />
                                    {tokenMeta.symbol || "Unknown"} ({token.balance} Current :{prices.tokenPrices[token.mintAddress] } You :  {prices.tokenPrices[token.mintAddress]  * token.balance}
                                </MenuItem>
                            );
                        })
                    ) : (
                        <MenuItem disabled>No tokens available</MenuItem>
                    )}
                </Select>
            </div>
            <div className="mb-4">
                {/*<label className="block text-gray-300 text-sm mb-2">Token Quantity</label>*/}
                {/*<TextField*/}
                {/*    type="number"*/}
                {/*    value={tokenQuantity}*/}
                {/*    onChange={(e) => setTokenQuantity(e.target.value)}*/}
                {/*    className="w-full"*/}
                {/*    placeholder="Enter quantity"*/}
                {/*    inputProps={{ min: 0.000001 }}*/}
                {/*/>*/}
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-2">Merchant Address</label>
                <TextField
                    type="text"
                    value={merchantAddress}
                    onChange={(e) => setMerchantAddress(e.target.value)}
                    className="w-full"
                    placeholder="Enter merchant's address"

                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-2">Amount in USDC</label>
                <TextField
                    type="number"
                    value={outAmount}
                    onChange={(e) => setOutAmount(e.target.value)}
                    className="w-full"
                    placeholder="Enter amount in USDC"
                    inputProps={{ min: 0.000001 }}
                />
            </div>

            <div className="mb-4 text-center text-gray-300">
                <p>Token Price: ${prices.tokenPrices[selectedToken]}</p>
                {/*<p>Total Value: ${tokenQuantity}</p>*/}
                {!isValidSwap && <p className="text-red-500">Insufficient token value for swap.</p>}
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={swapTokens}
                disabled={loading || !publicKey || !isValidSwap}
                className="w-full py-2 mt-3"
            >
                {loading ? "Swapping..." : "Swap Now"}
            </Button>
            {error && <p className="text-red-500 mt-3 text-center">Error: {error}</p>}
            {transactionUrl && (
                <p className="text-green-400 mt-3 text-center">
                    Success! View on <a href={transactionUrl} target="_blank" rel="noopener noreferrer" className="underline">Solscan</a>

                    {transactionUrl && <TransactionPopup transactionUrl={transactionUrl}  />}

                </p>
            )}
            <TransactionPopup transactionUrl={"https://solscan.io/tx/5NT5BZyvLJzWXTepo9uvK8z2VHMCGfDAZvStE9GbHrsSNBi3gFR1k4fN7std48VxpKu2MrukcVpczpGzuCf1Cqce"}  />
        </div>
    );
};

export default SwapInterface;
