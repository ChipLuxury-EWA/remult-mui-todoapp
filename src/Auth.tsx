import { FormEvent, useState, useEffect } from "react";
import { remult } from "remult";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";

import App from "./App";
import SignIn from "./components/SignIn";
import { useSignInMutation, useSignOutMutation } from "./redux/auth.api";

const Auth = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [authUser, { data, error, isLoading, isError, isSuccess }] = useSignInMutation();
    const [signOutUser, { isLoading: isSignOutLoading, isSuccess: isSignedOutSuccess }] = useSignOutMutation();

    const [userName, setUserName] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isError && "data" in error!) {
            enqueueSnackbar(error!.data as string, { variant: "error" });
        }
    }, [isError, error, enqueueSnackbar]);

    useEffect(() => {
        if (isSuccess) {
            remult.user = data;
            setIsSignedIn(true);
            setUserName("");
            enqueueSnackbar(`Hello ${remult.user!.name}`, { variant: "success" });
        }
    }, [isSuccess, data, enqueueSnackbar]);

    const signIn: (e: FormEvent) => void = async (e: FormEvent) => {
        e.preventDefault();
        await authUser({ userName });
    };

    const signOut: () => void = async () => {
        await signOutUser({});
        remult.user = undefined;
        setIsSignedIn(false);
    };

    if (isLoading || isSignOutLoading) {
        return <CircularProgress />;
    } else if (isSignedIn && isSuccess) {
        return <App signOut={signOut} />;
    } else if (!isSignedIn || isSignedOutSuccess) {
        return <SignIn userName={userName} setUserName={setUserName} signIn={signIn} />;
    }
};

export default Auth;
