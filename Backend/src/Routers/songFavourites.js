import express from "express";
import {
  createFavourites,
  getFavourites,
} from "../Controllers/songFavourites.js";
import authUser from "../Middlewares/authMiddlewere.js";

const router = express.Router();

router.get("/songFavourites", authUser, getFavourites);
router.post("/songFavourites", authUser, createFavourites);

export default router;
