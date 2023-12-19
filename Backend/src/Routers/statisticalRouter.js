import express from "express";
import { statistical } from '../Controllers/statisticalController.js'

const router = express.Router()


router.post("/statistical",statistical)

export default router;
