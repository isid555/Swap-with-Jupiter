import {
    AppBar,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
    Box,
    Tooltip
} from "@mui/material";
import {
    WalletMultiButton,
    WalletDisconnectButton
} from "@solana/wallet-adapter-react-ui";

export function NavBar() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <AppBar
            position="static"
            sx={{
                background: "linear-gradient(135deg, #1f1f1f, #2c2c2c)",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                fontFamily: "'Orbitron', sans-serif",
                animation: "shimmer 8s linear infinite",
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: isSmallScreen ? "column" : "row",
                    gap: isSmallScreen ? 2 : 0,
                    py: isSmallScreen ? 2 : 0,
                    textAlign: isSmallScreen ? "center" : "inherit",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: "#f0f0f0",
                        fontWeight: "bold",
                        fontSize: {
                            xs: "1.2rem",
                            sm: "1.5rem"
                        },
                        textShadow: "0 0 6px rgba(255,255,255,0.5)",
                    }}
                >
                    SWAPITER
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: "12px",
                        flexDirection: isSmallScreen ? "column" : "row",
                        alignItems: "center"
                    }}
                >


                    

                    <WalletMultiButton style={{
                        background: "linear-gradient(90deg, #8e2de2, #4a00e0)",
                        color: "#fff",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontFamily: "'Orbitron', sans-serif",
                        boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                        width: isSmallScreen ? "100%" : "auto"
                    }} />
                    <WalletDisconnectButton style={{
                        background: "linear-gradient(90deg, #4a00e0, #8e2de2)",
                        color: "#fff",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontFamily: "'Orbitron', sans-serif",
                        boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                        width: isSmallScreen ? "100%" : "auto"
                    }} />
                </Box>
            </Toolbar>

            {/* Animation keyframes for shimmer */}
            <style>{`
                @keyframes shimmer {
                    0% {
                        background-position: -1000px 0;
                    }
                    100% {
                        background-position: 1000px 0;
                    }
                }
            `}</style>
        </AppBar>
    );
}
