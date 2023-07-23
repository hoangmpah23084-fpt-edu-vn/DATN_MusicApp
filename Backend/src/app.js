import express from "express";
import mongoose from "mongoose";
import Route_Song from "./Routers/Song";
import GenreRouter from "./Routers/genre";
import AlbumRouter from "./Routers/album";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const { API } = process.env;

app.use("/api", Route_Song);
app.use("/api", GenreRouter);
app.use("/api", AlbumRouter);

mongoose.connect(API);

export const viteNodeApp = app;
