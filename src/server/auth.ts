import express, { Router } from "express";
import type { UserInfo } from "remult";

const validUser: UserInfo[] = [
    { id: "1", name: "admin" },
    { id: "2", name: "user" },
];

export const auth = Router();
auth.use(express.json());

auth.post("/api/signIn", (req, res) => {
    const user = validUser.find((user) => user.name === req.body.userName);

    if (user) {
        req.session!["user"] = user;
        res.json(user);
    } else {
        res.status(404).json(`Invalid userName try ${validUser.map((u) => u.name).join(" ")}`);
    }
});

auth.post("/api/signOut", (req, res) => {
    req.session!["user"] = null;
    res.json("Signed Out")
});

auth.get("/api/currentUser", (req, res)=> res.json(req.session!["user"]))