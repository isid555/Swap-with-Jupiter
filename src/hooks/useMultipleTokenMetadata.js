import { useState, useEffect } from "react";

const useMultipleTokenMetadata = (tokens) => {
    const [metadataList, setMetadataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            if (!tokens || tokens.length === 0) return;

            try {
                setLoading(true);


                const mintAddresses = tokens.map(token => token.mintAddress);

                // Fetch metadata for all tokens
                const metadataResults = await Promise.all(
                    mintAddresses.map(async (mint) => {

                        try {
                            const response = await fetch(`https://api.jup.ag/tokens/v1/token/${mint}`);
                            if (!response.ok) throw new Error("Failed to fetch metadata");
                            return await response.json();
                        } catch (err) {
                            console.error(`Error fetching metadata for ${mint}:`, err);
                            return { address: mint, symbol: "Unknown", name: "Unknown", logoURI: "", decimals: 0 };
                        }
                    })
                );

                setMetadataList(metadataResults);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMetadata();
    }, [tokens]);

    return { metadataList, loading, error };
};

export default useMultipleTokenMetadata;
