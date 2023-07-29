import express from "express";
import cors from "cors";
import ArtistRoute from "./Routers/artistRouter.js";
import { ConnectDB } from "./Config/connect.js";
import dotenv from "dotenv";

import mongoose from "mongoose";
import Route_Song from "./Routers/Song";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

/* db */
ConnectDB();

app.use("/api", Route_Song);

app.listen(process.env.PORT, () => {
  console.log("Port is running at: " + process.env.PORT);
});

export const viteNodeApp = app;
