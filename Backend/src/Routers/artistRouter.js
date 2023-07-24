import { Router } from "express";
import artistController from "../Controllers/artistController.js";

const ArtistRoute = Router();

ArtistRoute.get("/artists", artistController.getArtists);
ArtistRoute.get("/artist/:id", artistController.getItem);
ArtistRoute.post("/artist", artistController.createArtist);
ArtistRoute.put("/artist/:id", artistController.updateArtist);
ArtistRoute.delete("/artist/:id", artistController.deleteArtist);

export default ArtistRoute;
