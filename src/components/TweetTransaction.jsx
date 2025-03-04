import {useState} from "react";

const TransactionPopup = ({ transactionUrl }) => {
    const [isVisible, setIsVisible] = useState(true); // Controls visibility of the popup

    const handleTweet = () => {
        const tweetText = `🚀 Just completed a transaction on Swappiter!! Great Work @r555sid !!! Check it out here: ${transactionUrl}`;
        const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(tweetUrl, "_blank");
    };

    if (!isVisible) return null; // Hide popup when closed

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center relative">
                {/* Close button to hide popup */}
                <button onClick={() => setIsVisible(false)} className="absolute top-2 right-3 text-gray-600 text-xl cursor-pointer">
                    &times;
                </button>

                <p className="text-green-500 font-semibold">🎉 Success!</p>
                <p className="mt-2">
                    View on <a href={transactionUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Solscan</a>
                </p>

                <button
                    onClick={handleTweet}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Tweet on X 🚀
                </button>
            </div>
        </div>
    );
};

export default TransactionPopup;