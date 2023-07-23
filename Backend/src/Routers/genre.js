import express from "express";
import { create_Genre, getAll_Genre, get_GenreById, delete_Genre, update_Genre } from "../Controllers/genre";
const router = express.Router();

router.get("/genre", getAll_Genre);
router.get("/genre/:id", get_GenreById);
router.post("/genre", create_Genre);
router.patch("/genre/:id", update_Genre);
router.delete("/genre/:id", delete_Genre);

export default router;
