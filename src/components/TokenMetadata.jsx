import React from "react";
import useMultipleTokenMetadata from "../hooks/useMultipleTokenMetadata";

const tokensA = [
    { account: { data: { parsed: { info: { mint: "68yeZ756U5Wvxcj5GTRxHhiSXZvdqetUHWbAoi2KvdPP", tokenAmount: { uiAmount: 100 } } } } } },
    { account: { data: { parsed: { info: { mint: "5zE8B2YuNegzQKdkKv4hWgL9k8h39f1zsnT1NHdj1NQ3", tokenAmount: { uiAmount: 50 } } } } } },
    { account: { data: { parsed: { info: { mint: "CdfRUhtND1b7hYJd8he5tCeW3GPCJmqrZzrh7rvEpump", tokenAmount: { uiAmount: 200 } } } } } }
];

const TokenMetadata = () => {
    const { metadataList, loading, error } = useMultipleTokenMetadata(tokensA);

    if (loading) return <p>Loading token metadata...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Solana Token Metadata</h2>
            <ul>
                {metadataList.map((metadata, index) => (
                    <li key={metadata.address}>
                        {metadata.logoURI && <img src={metadata.logoURI} alt={metadata.name} width="50" />}
                        <h3>{metadata.name} ({metadata.symbol})</h3>
                        <p>Mint Address: {metadata.address}</p>
                        <p>Decimals: {metadata.decimals}</p>
                        <p>Balance: {tokensA[index].account.data.parsed.info.tokenAmount.uiAmount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TokenMetadata;
