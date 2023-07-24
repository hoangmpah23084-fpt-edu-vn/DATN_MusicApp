import express from "express"
import { createFavourites, getFavourites } from "../Controllers/songFavourites";


const router = express.Router();

router.get("/songFavourites/:id_user", getFavourites)
router.post("/songFavourites", createFavourites)


export default router