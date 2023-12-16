import express from "express";
import {
  ChangePassword,
  VeryPass,
  getAllMembers,
  getOneUser,
  refreshToken,
  sendPass,
  signin,
  signup,
  updateUser,
} from "../Controllers/auth.js";
import authUser from "../Middlewares/authMiddlewere.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/members", getAllMembers);
router.get("/members/:id", getOneUser);
router.post("/token/refresh", refreshToken);
router.put("/members",authUser,updateUser);
router.post("/changePassword",authUser,ChangePassword);
router.post("/VeryPass",authUser,VeryPass);
router.post("/sendPass",authUser,sendPass);



export default router;
