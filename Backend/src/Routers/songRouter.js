import express from "express";
import {
  createSong,
  deleteSong,
  get_Song,
  get_Songs,
  updateViewSong,
  update_Song,
} from "../Controllers/songController.js";

const Route_Song = express.Router();

Route_Song.post("/Song", createSong);
Route_Song.get("/Song", get_Songs);
Route_Song.get("/Song/:id", get_Song);
Route_Song.put("/Song/:id", update_Song);
Route_Song.delete("/Song/:id", deleteSong);
Route_Song.put("/Song/updateView/:id", updateViewSong);


export default Route_Song;
