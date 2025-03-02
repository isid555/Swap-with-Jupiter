import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { PublicKey, Connection, VersionedTransaction } from "@solana/web3.js";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export const useSwap = (inputTokenAddress, outAmount, slippageBps, MERCHANT_ACCOUNT) => {
    const { publicKey, sendTransaction, wallet } = useWallet(); // Single useWallet call

    const connection = new Connection(
        "https://solana-mainnet.g.alchemy.com/v2/-rj1mfqdqwB4iBYlzUTBMLFir79YxHAi",
        "confirmed"
    );

    outAmount *= 1e6;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transactionUrl, setTransactionUrl] = useState(null);

    const swapTokens = async () => {
        if (!connection || !publicKey) {
            setError("Wallet not connected");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setTransactionUrl(null);

            const merchantUSDCTokenAccount = await getAssociatedTokenAddress(
                new PublicKey(USDC_MINT),
                new PublicKey(MERCHANT_ACCOUNT),
                true,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            );

            // Fetch quote from Jupiter API
            const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            await delay(1000); // Add delay to avoid rate limits

            const quoteResponse = await (
                await fetch(
                    `https://api.jup.ag/swap/v1/quote?inputMint=${inputTokenAddress}&outputMint=${USDC_MINT}&amount=${outAmount}&slippageBps=${slippageBps}&restrictIntermediateTokens=true&swapMode=ExactOut`
                )
            ).json();

            console.log(quoteResponse);

            const jsonPostStrigify = JSON.stringify({
                quoteResponse,
                userPublicKey: publicKey.toBase58(),
                destinationTokenAccount: merchantUSDCTokenAccount.toBase58(),
                dynamicSlippage: true,
                wrapAndUnwrapSol: true,
            });

            console.log(jsonPostStrigify);

            // Execute the swap
            const swapResponse = await (
                await fetch("https://api.jup.ag/swap/v1/swap", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: jsonPostStrigify,
                })
            ).json();

            console.log(swapResponse);

            const transactionBase64 = swapResponse.swapTransaction;

            if (!transactionBase64) {
                console.error("Error: swapResponse.swapTransaction is undefined or null");
                return;
            }

            // Convert Base64 to Uint8Array for browser compatibility
            const transactionBinary = new Uint8Array(
                atob(transactionBase64).split("").map(c => c.charCodeAt(0))
            );

            const transaction = VersionedTransaction.deserialize(transactionBinary);

            transaction.feePayer = publicKey; // Set the transaction fee payer



            const signedTransaction = await wallet.adapter.signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
                preflightCommitment: "finalized",
            });

            // Confirm transaction
            const confirmation = await connection.confirmTransaction(signature, "finalized");

            if (confirmation.value.err) {
                throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
            } else {
                const url = `https://solscan.io/tx/${signature}`;
                console.log(`Transaction successful: ${url}`);
                setTransactionUrl(url);
            }
        } catch (err) {
            console.error("Swap error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { swapTokens, loading, error, transactionUrl };
};
