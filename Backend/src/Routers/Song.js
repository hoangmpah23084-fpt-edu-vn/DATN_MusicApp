import express from "express";
import {
  createSong,
  deleteSong,
  get_Song,
  get_Songs,
  update_Song,
} from "../Controllers/Song";

const Route_Song = express.Router();

Route_Song.post("/Song", createSong);
Route_Song.get("/Song", get_Songs);
Route_Song.get("/Song/:id", get_Song);
Route_Song.put("/Song/:id", update_Song);
Route_Song.delete("/Song/:id", deleteSong);

export default Route_Song;
