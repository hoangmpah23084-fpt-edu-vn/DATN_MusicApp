import express from "express";
import { monthSong, monthUser, statistical } from '../Controllers/statisticalController.js'

const router = express.Router()


router.post("/statistical",statistical)
router.get("/statistical/month-song",monthSong)
router.get("/statistical/month-user",monthUser)

export default router;
