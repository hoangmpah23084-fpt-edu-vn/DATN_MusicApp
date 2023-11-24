import express from "express";
import {
  getAllMembers,
  getOneUser,
  refreshToken,
  signin,
  signup,
} from "../Controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/members", getAllMembers);
router.get("/members/:id", getOneUser);
router.post("/token/refresh", refreshToken);


export default router;
