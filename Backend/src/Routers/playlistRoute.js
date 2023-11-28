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
import authUser from "../Middlewares/authMiddlewere.js";

const router = express.Router();

router.get("/playlist",authUser, getAllPlaylist);
router.get("/playlist/:id",authUser, getOnePlaylist);
router.post("/playlist",authUser, createPlaylist);
router.put("/playlist/:id",authUser, updatePlaylist);
router.delete("/playlist/:id",authUser, removePlaylist);
router.put("/playlist/create/song/:id",authUser, addSongToPlaylist);
router.put("/playlist/delete/song/:id",authUser, removeSongToPlaylist);
export default router;
