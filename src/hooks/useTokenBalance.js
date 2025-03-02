import { useState, useEffect } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const SOLANA_RPC = "https://api.devnet.solana.com";
const connection = new Connection(SOLANA_RPC, "confirmed");

const useTokenBalance = (walletAddress, refreshInterval = 10000) => {
    const [solBalance, setSolBalance] = useState(0);
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBalances = async () => {
            if (!walletAddress) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const walletPublicKey = new PublicKey(walletAddress);

                // Get SOL balance
                const solBalanceLamports = await connection.getBalance(walletPublicKey);
                const newSolBalance = solBalanceLamports / LAMPORTS_PER_SOL;

                // Get SPL token balances
                const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPublicKey, {
                    programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
                });

                const tokensList = tokenAccounts.value.map((account) => ({
                    mintAddress: account.account.data.parsed.info.mint,
                    balance: account.account.data.parsed.info.tokenAmount.uiAmount,
                }));

                // Only update state if values changed to avoid unnecessary re-renders
                if (newSolBalance !== solBalance) setSolBalance(newSolBalance);
                if (JSON.stringify(tokensList) !== JSON.stringify(tokens)) setTokens(tokensList);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBalances(); // Fetch immediately

        // Auto-refresh balances if `refreshInterval` is set
        const interval = refreshInterval ? setInterval(fetchBalances, refreshInterval) : null;

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [walletAddress, refreshInterval]);

    return { solBalance, tokens, loading, error };
};

export default useTokenBalance;
