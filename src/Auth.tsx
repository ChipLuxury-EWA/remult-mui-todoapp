import { FormEvent, useState } from "react";
import { remult } from "remult";
import { useSnackbar } from "notistack";

import App from "./App";
import SignIn from "./components/SignIn";

const Auth = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [userName, setUserName] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);

    const signIn: (e: FormEvent) => void = async (e: FormEvent) => {
        e.preventDefault();
        const result = await fetch("/api/signIn", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName }),
        });

        if (result.ok) {
            remult.user = await result.json();
            setIsSignedIn(true);
            setUserName("");
            enqueueSnackbar(`Hello ${remult.user!.name}`, { variant: "success" });
        } else {
            enqueueSnackbar(await result.json(), { variant: "error" });
        }
    };

    const signOut: () => void = async () => {
        await fetch("/api/signOut", {
            method: "POST",
        });
        remult.user = undefined;
        setIsSignedIn(false);
    };
    if (isSignedIn) {
        return <App signOut={signOut} />;
    } else {
        return <SignIn userName={userName} setUserName={setUserName} signIn={signIn} />;
    }
};

export default Auth;
