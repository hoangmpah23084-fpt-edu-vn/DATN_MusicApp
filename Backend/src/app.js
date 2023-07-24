import express from "express";
import cors from "cors";
import ArtistRoute from "./Routers/artistRouter.js";
import { ConnectDB } from "./Config/connect.js";
import dotenv from "dotenv";

import mongoose from "mongoose";
import Route_Song from "./Routers/songRouter.js";
import Router_Playlist from "./Routers/playlistRoute.js";
import GenderRouter from "./Routers/genreRouter.js";
import AlbumRouter from "./Routers/albumRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

/* db */
ConnectDB();

app.use("/api", Route_Song);
app.use("/api", GenderRouter);
app.use("/api", AlbumRouter);

app.use("/api", Router_Playlist);

/* router artist */
app.use("/api/", ArtistRoute);

app.listen(process.env.PORT, () => {
  console.log("Port is running at: " + process.env.PORT);
});

export const viteNodeApp = app;
