import express from "express";
import mongoose from "mongoose";
import Route_Song from "./Routers/Song";
import dotenv from "dotenv";
import cors from "cors";
import Router_Playlist from "./Routers/Playlist";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const { API } = process.env;

app.use("/api", Route_Song);
app.use("/api", Router_Playlist);

mongoose.connect(API);

export const viteNodeApp = app;
