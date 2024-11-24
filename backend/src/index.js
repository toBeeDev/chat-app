import express from "express";
import dotenv from "dotenv";
import http from "http";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);

app.use(express.json());

app.use("/api/auth", authRoutes);

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
