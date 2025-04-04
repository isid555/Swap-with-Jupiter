import { useState } from "react";

const TransactionPopup = ({ transactionUrl }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleTweet = () => {
        const tweetText = `🚀 Just completed a transaction on Swappiter!! Great Work @r555sid !!! Check it out here: ${transactionUrl}`;
        const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(tweetUrl, "_blank");
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div
                className="p-6 rounded-2xl max-w-sm text-center relative"
                style={{
                    background: "linear-gradient(135deg, #1f1f1f, #2c2c2c)",
                    border: "1px solid rgba(192,192,192,0.4)", // silver border
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
                    color: "#f0f0f0",
                    fontFamily: "'Orbitron', sans-serif",
                    backdropFilter: "blur(10px)",
                }}
            >
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-3 text-gray-400 text-2xl hover:text-red-400 transition cursor-pointer"
                >
                    &times;
                </button>

                <p className="text-green-400 font-semibold text-lg mb-2">🎉 Transaction Successful!</p>
                <p className="mb-4 text-sm">
                    View on{" "}
                    <a
                        href={transactionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-400 hover:text-blue-300 transition"
                    >
                        Solscan
                    </a>
                </p>

                <button
                    onClick={handleTweet}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-xl hover:brightness-110 transition-all shadow-md"
                >
                    Tweet on X 🚀
                </button>
            </div>
        </div>
    );
};

export default TransactionPopup;
