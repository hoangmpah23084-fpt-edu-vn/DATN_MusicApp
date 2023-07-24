import express from "express";
import { getAllMembers, getOneUser, signin, signup } from "../Controllers/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/members", getAllMembers);
router.get("/members/:id", getOneUser);

export default router;
