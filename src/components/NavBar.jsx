import { Button, Card, CardContent, TextField, MenuItem, AppBar, Toolbar, Typography } from "@mui/material";
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

export function NavBar(){
    return(
        <div>
            {/* Navbar */}
            <AppBar position="static" className="bg-gray-800">
                <Toolbar className="flex justify-between">
                    <Typography variant="h6">Web3 Dashboard</Typography>
                    <div className="flex gap-2">
                        <WalletMultiButton />
                        <WalletDisconnectButton />
                    </div>
                </Toolbar>
            </AppBar>

        </div>
    )
}