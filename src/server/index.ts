import express from "express";
import { api } from "./api";

const PORT = process.env.PORT || 3002

const app = express();
app.use(api)

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))