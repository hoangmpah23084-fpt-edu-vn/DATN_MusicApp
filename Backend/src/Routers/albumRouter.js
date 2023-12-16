import express from "express";
import { create_Album, getAll_Album, get_AlbumById, delete_Album, update_Album, addSongToAlbum, removeSongToAlbum } from "../Controllers/albumController.js";
const AlbumRouter = express.Router();

AlbumRouter.get("/album", getAll_Album);
AlbumRouter.get("/album/:id", get_AlbumById);
AlbumRouter.post("/album", create_Album);
AlbumRouter.put("/album/:id", update_Album);
AlbumRouter.delete("/album/:id", delete_Album);
AlbumRouter.put("/album/song/:id", addSongToAlbum);
AlbumRouter.put("/album/delete/song/:id", removeSongToAlbum);

export default AlbumRouter;
