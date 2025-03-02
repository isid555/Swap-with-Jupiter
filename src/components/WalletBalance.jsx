import React from "react";
import useTokenBalance from "../hooks/useTokenBalance";
import { useWallet} from "@solana/wallet-adapter-react";



const WalletBalance = () => {
    const wallet = useWallet();

    const { solBalance, tokens, loading, error } = useTokenBalance(wallet.publicKey, 0);



    if (loading) return <p>Loading balances...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Wallet Balance</h2>
            <p><strong>SOL Balance:</strong> {solBalance} SOL</p>
            <h3>Token Balances:</h3>
            <ul>
                {tokens.length > 0 ? (
                    tokens.map((token) => (
                        <li key={token.mintAddress}>
                            {token.mintAddress}: {token.balance} tokens
                        </li>
                    ))
                ) : (
                    <p>No SPL tokens found.</p>
                )}
            </ul>
        </div>
    );
};

export default WalletBalance;
