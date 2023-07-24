import express from "express";
import mongoose from "mongoose";
import Route_Song from "./Routers/Song";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import routerAuth from "./Routers/router_auth";
dotenv.config();

const app = express();
app.use(morgan("short"));
app.use(express.json());
app.use(cors());

const { API } = process.env;
app.use("/api", Route_Song);

mongoose
  .connect(API)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });
// Router

app.use("/api", routerAuth);

export const viteNodeApp = app;
