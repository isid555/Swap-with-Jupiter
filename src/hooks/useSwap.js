import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import {PublicKey, Connection, VersionedTransaction, Transaction} from "@solana/web3.js";
import {
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getOrCreateAssociatedTokenAccount,
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddressSync
} from "@solana/spl-token";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export const useSwap = (inputTokenAddress, outAmount, slippageBps, MERCHANT_ACCOUNT) => {
    const { publicKey, wallet } = useWallet(); // Single useWallet call

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






            const blockhash = await connection.getLatestBlockhash();


// Calculate the merchant's associated token account address

            console.log("hi1")

            const merchantUSDCTokenAccount = await getAssociatedTokenAddress(
                new PublicKey(USDC_MINT),  // The USDC mint address
                new PublicKey(MERCHANT_ACCOUNT),  // The merchant's public key
                true,  // Whether to create the account if it does not exist
                TOKEN_PROGRAM_ID,  // Token program ID (default)
                ASSOCIATED_TOKEN_PROGRAM_ID  // Associated token program ID (default)
            );

            console.log("hi2")

// Create transaction to pay for the creation of the merchant's ATA
            const transaction_M_ATA = new Transaction().add(
                createAssociatedTokenAccountInstruction(
                    publicKey,  // User's wallet (payer)
                    merchantUSDCTokenAccount,  // New ATA for merchant
                    new PublicKey(MERCHANT_ACCOUNT),  // Merchant as the owner
                    new PublicKey(USDC_MINT)  // Token mint (USDC)
                )
            );
            transaction_M_ATA.feePayer = publicKey;
            transaction_M_ATA.recentBlockhash = blockhash.blockhash;

        const payerKeypair = wallet.adapter.publicKey;
            try {
                const signature_M_ATA = await wallet.sendTransaction(transaction_M_ATA, connection, {
                    signers: [payerKeypair], // Add any additional signers if required
                });

                // Confirm the transaction
                await connection.confirmTransaction(signature_M_ATA, "finalized");
                console.log(`Transaction successful: ${signature_M_ATA}`);
            } catch (error) {
                console.error("Error sending transaction:", error);
            }






            console.log("hi3")

            // const payerKeypair = wallet.adapter; // Access the wallet's public key (signer required here)
            // const signature_M_ATA = await connection.sendTransaction(transaction_M_ATA, [payerKeypair]); // Use the correct payer keypair here
            // await connection.confirmTransaction(signature_M_ATA, "finalized");

            console.log("hi4")

            console.log("Merchant USDC token account:", merchantUSDCTokenAccount.toBase58());




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


            if (!transactionBase64) {
                console.error("Error: swapResponse.swapTransaction is undefined or null");
                return;
            }



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
