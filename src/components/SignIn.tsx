import { Paper, TextField, IconButton, Box } from "@mui/material";
import { Login } from "@mui/icons-material";
import { Dispatch, FormEvent, SetStateAction } from "react";

const SignIn = ({
    userName,
    setUserName,
    signIn,
}: {
    userName: string;
    setUserName: Dispatch<SetStateAction<string>>;
    signIn: (e: FormEvent) => void;
}) => {
    return (
        <Paper sx={{ maxWidth: 360 }} elevation={5}>
            <Box component="form" onSubmit={signIn} sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                    id="userName"
                    variant="outlined"
                    color="primary"
                    placeholder="Enter user name, try admin or user"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    sx={{ "& fieldset": { border: "none" } }}
                    margin="dense"
                    fullWidth
                    autoFocus
                />
                <IconButton type="submit" size="medium" sx={{ mr: 0.5 }}>
                    <Login />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default SignIn;
