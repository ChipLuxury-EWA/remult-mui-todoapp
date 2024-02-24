import express, { Router } from "express";
import type { UserInfo } from "remult";

const validUser: UserInfo[] = [
    { id: "1", name: "admin", roles: ["admin"] },
    { id: "2", name: "user" },
];

export const auth = Router();
auth.use(express.json());

auth.post("/api/signIn", (req, res) => {
    const { userName } = req.body;
    const user = validUser.find((user) => user.name === userName);
    if (user) {
        req.session!["user"] = user;
        res.json(user);
    } else {
        res.status(404).json(`${userName} is invalid user name try ${validUser.map((u) => u.name).join(" or ")}`);
    }
});

auth.post("/api/signOut", (req, res) => {
    req.session!["user"] = null;
    res.json("Signed Out");
});

auth.get("/api/currentUser", (req, res) => res.json(req.session!["user"]));
