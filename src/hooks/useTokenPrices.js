import { useState, useEffect } from "react";
import axios from "axios";

const SOL_MINT = "So11111111111111111111111111111111111111112";

const useTokenPrices = (solAmount, tokens, interval = 5000) => {
    const [prices, setPrices] = useState({ solPrice: 0, tokenPrices: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // To prevent state updates after unmount
        const fetchPrices = async () => {
            try {

                const solResponse = await axios.get(`https://api.jup.ag/price/v2?ids=${SOL_MINT}`);
                const solPrice = solResponse.data?.data?.[SOL_MINT]?.price || 0;



                // Fetch token prices
                const tokenPrices = {};
                await Promise.all(
                    tokens.map(async (token) => {
                        try {
                            const tokenResponse = await axios.get(
                                `https://api.jup.ag/price/v2?ids=${token.address}`,
                                {headers: {"Content-Type":"application/json"}}
                            );



                            tokenPrices[token.address] = tokenResponse.data?.data?.[token.address]?.price || 0;
                        } catch (tokenError) {
                            console.error(`Error fetching price for ${token.address}:`, tokenError);
                        }
                    })
                );

                if (isMounted) {
                    setPrices({ solPrice, tokenPrices });
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchPrices();
        const intervalId = setInterval(fetchPrices, interval);

        return () => {
            isMounted = false; // Prevent setting state after unmount
            clearInterval(intervalId);
        };
    }, [solAmount, JSON.stringify(tokens), interval]); // Ensure proper dependency tracking

    return { prices, loading, error };
};

export default useTokenPrices;
