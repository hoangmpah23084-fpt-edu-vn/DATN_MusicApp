import express from "express"
import { getFavourites } from "../Controllers/songFavourites";


const router = express.Router();

router.get("/songFavourites", getFavourites)

export default router