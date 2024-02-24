import { Paper, TextField, IconButton, Box, Grid } from "@mui/material";
import { Login } from "@mui/icons-material";
import { Dispatch, FormEvent, SetStateAction } from "react";

const SignIn = ({
    userName,
    setUserName,
    signIn,
    maxWidth,
}: {
    userName: string;
    setUserName: Dispatch<SetStateAction<string>>;
    signIn: (e: FormEvent) => void;
    maxWidth: number;
}) => {
    return (
        <Box padding={2} display="flex" alignItems="center" justifyContent="center">
            <Grid container maxWidth={maxWidth} direction="column" justifyContent="flex-start" alignItems="stretch">
                <Paper elevation={5}>
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
            </Grid>
        </Box>
    );
};

export default SignIn;
