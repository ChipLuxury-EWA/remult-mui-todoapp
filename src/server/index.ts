import express from "express";
import session from "cookie-session";
import { api } from "./api";
import { auth } from "./auth";

const app = express();
app.use(session({ secret: process.env.SESSION_SECRET || "my secret" }));
app.use(auth);
app.use(api);
app.use(express.static(process.cwd() + "/dist"))

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
