import express from "express";
import session from 'cookie-session'
import { api } from "./api";

const PORT = process.env.PORT || 3002

const app = express();
app.use(session({secret: process.env.SESSION_SECRET || "my secret"}))
app.use(api)

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))