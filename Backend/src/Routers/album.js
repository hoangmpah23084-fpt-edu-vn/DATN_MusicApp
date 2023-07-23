import express from "express";
import { create_Album, getAll_Album, get_AlbumById, delete_Album, update_Album } from "../Controllers/album";
const router = express.Router();

router.get("/album", getAll_Album);
router.get("/album/:id", get_AlbumById);
router.post("/album", create_Album);
router.patch("/album/:id", update_Album);
router.delete("/album/:id", delete_Album);

export default router;
