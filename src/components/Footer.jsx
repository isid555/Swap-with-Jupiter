// src/components/Footer.jsx
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Typography } from "@mui/material";

const Footer = () => {
    return (
        <footer className="mt-12 text-center py-6 relative z-10">
            <div
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-700 bg-[#111] shadow-lg transition hover:bg-[#1e1e1e]"
                style={{
                    backgroundImage:
                        "linear-gradient(#111111, #111111), linear-gradient(120deg, #aaa, #fff, #aaa)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                    color: "#ccc",
                }}
            >
                <GitHubIcon style={{ color: "#ccc" }} />
                <a
                    href="https://github.com/isid555/Swap-with-Jupiter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium shiny-white hover:underline"
                >
                    View on GitHub
                </a>
            </div>
            <Typography variant="caption" className="block mt-2 text-gray-600">
                Built with 💜 on Solana & Jupiter
            </Typography>
        </footer>
    );
};

export default Footer;
