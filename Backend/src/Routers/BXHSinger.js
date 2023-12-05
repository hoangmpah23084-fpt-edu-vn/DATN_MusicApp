import express from "express";
import { createBXHSinger, getBXHSinger } from "../Controllers/BXHController.js";
const BHXRouter = express.Router();

BHXRouter.post("/BXHSinger", createBXHSinger);
BHXRouter.get("/BXHSinger", getBXHSinger);

export default BHXRouter;
