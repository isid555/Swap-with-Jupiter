
import useTokenBalance from "./useTokenBalance.js";
import useTokenPrices from "./useTokenPrices.js"

const useSolanaData = (walletAddress, tokens, interval) => {
    const { solBalance, tokens: tokenBalances, loading: balanceLoading, error: balanceError } = useTokenBalance(walletAddress);

    let tokensA = [
        { address: "68yeZ756U5Wvxcj5GTRxHhiSXZvdqetUHWbAoi2KvdPP", balance: 100 },
        { address: "A5jm259qa9F6MGTxybFAsTa7fUAsbWmuUKmP6Y4gpump", balance: 50 },
        { address: "CdfRUhtND1b7hYJd8he5tCeW3GPCJmqrZzrh7rvEpump", balance: 200 }
    ];


    const { prices, loading: priceLoading, error: priceError } = useTokenPrices(solBalance, tokensA, interval);

    // console.log(prices)

    const loading = balanceLoading || priceLoading;
    const error = balanceError || priceError;

    return { solBalance, tokenBalances, prices, loading, error };
};

export default useSolanaData;
