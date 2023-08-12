import express from "express";
import routerFavourite from "./Routers/songFavourites.js";
import dotenv from "dotenv";
import cors from "cors";
import ArtistRoute from "./Routers/artistRouter.js";
import { ConnectDB } from "./Config/connect.js";
import Route_Song from "./Routers/songRouter.js";
import Router_Playlist from "./Routers/playlistRoute.js";
import GenderRouter from "./Routers/genreRouter.js";
import AlbumRouter from "./Routers/albumRouter.js";
import routerAuth from "./Routers/router_auth.js";
import roomRouter from "./Routers/roomRouter.js";
import morgan from "morgan";

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

/* router artist */
app.use("/api/", ArtistRoute);

app.listen(process.env.PORT, () => {
  console.log("Port is running at: " + process.env.PORT);
});

export const viteNodeApp = app;
