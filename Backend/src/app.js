import express from "express";
import mongoose from "mongoose";
import Route_Song from "./Routers/Song";
import routerFavourite from "./Routers/songFavourites"
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const { API } = process.env;

app.use("/api", Route_Song);
app.use("/api", routerFavourite)

mongoose.connect(API);

export const viteNodeApp = app;
