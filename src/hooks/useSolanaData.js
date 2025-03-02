
import useTokenBalance from "./useTokenBalance.js";
import useTokenPrices from "./useTokenPrices.js"

const useSolanaData = (walletAddress, tokens, interval) => {
    const { solBalance, tokens: tokenBalances, loading: balanceLoading, error: balanceError } = useTokenBalance(walletAddress);




    const { prices, loading: priceLoading, error: priceError } = useTokenPrices(solBalance, tokenBalances, interval);

    // console.log(prices)

    const loading = balanceLoading || priceLoading;
    const error = balanceError || priceError;

    return { solBalance, tokenBalances, prices, loading, error };
};

export default useSolanaData;
