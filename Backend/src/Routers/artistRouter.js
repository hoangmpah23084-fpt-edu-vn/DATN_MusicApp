import { Router } from "express";
import artistController from "../Controllers/artistController.js";

const ArtistRoute = Router();

ArtistRoute.get("/artists", artistController.getArtists);
ArtistRoute.post("/artist", artistController.createArtist);

export default ArtistRoute;
