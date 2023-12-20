import express from "express";
import { monthSong, statistical } from '../Controllers/statisticalController.js'

const router = express.Router()


router.post("/statistical",statistical)
router.post("/statistical/month-song",monthSong)

export default router;
