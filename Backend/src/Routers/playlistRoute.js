import express from "express";
import {
  addSongToPlaylist,
  createPlaylist,
  getAllPlaylist,
  getOnePlaylist,
  removePlaylist,
  removeSongToPlaylist,
  updatePlaylist,
} from "../Controllers/playlistController.js";

const router = express.Router();

router.get("/playlist", getAllPlaylist);
router.get("/playlist/:id", getOnePlaylist);
router.post("/playlist", createPlaylist);
router.put("/playlist/:id", updatePlaylist);
router.delete("/playlist/:id", removePlaylist);
router.post("/playlist/song/:id", addSongToPlaylist);
router.delete("/playlist/song/:id", removeSongToPlaylist);
export default router;
