import express from "express";
import {
  createFavourites,
  getFavourites,
} from "../Controllers/songFavourites.js";

const router = express.Router();

router.get("/songFavourites/:id_user", getFavourites);
router.post("/songFavourites", createFavourites);

export default router;
