import express from "express";
import routerFavourite from "./Routers/songFavourites.js";
import dotenv from "dotenv";
import cors from "cors";
import ArtistRoute from "./Routers/artistRouter.js";
import { ConnectDB } from "./Config/connect.js";

import mongoose from "mongoose";
import Route_Song from "./Routers/songRouter.js";
import Router_Playlist from "./Routers/playlistRoute.js";
import RouterStatistical from "./Routers/statisticalRouter.js";
import GenderRouter from "./Routers/genreRouter.js";
import AlbumRouter from "./Routers/albumRouter.js";
import routerAuth from "./Routers/router_auth.js";
import roomRouter from "./Routers/roomRouter.js";
import morgan from "morgan";
import messageRouter from "./Routers/messRouter.js";
import Route_Video from "./Routers/videoRouter.js";
import ConnectSocket from "./socket/index.js";

dotenv.config();

const app = express();
app.use(morgan("short"));
app.use(express.json());
app.use(cors());
/* db */
ConnectDB();

app.use("/api", Route_Song);

app.use("/api", routerFavourite);
app.use("/api", GenderRouter);

app.use("/api", AlbumRouter);
app.use("/api", Router_Playlist);
app.use("/api", routerAuth);
app.use("/api", roomRouter);
app.use("/api", messageRouter);
app.use("/api", Route_Video);
app.use("/api", RouterStatistical);

/* router artist */
app.use("/api/", ArtistRoute);

const server = app.listen(process.env.PORT, () => {
  console.log("Port is running at: " + process.env.PORT);
});
ConnectSocket(server);

export const viteNodeApp = app;
