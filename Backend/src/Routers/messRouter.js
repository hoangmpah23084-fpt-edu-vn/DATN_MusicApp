import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessage,
} from "../Controllers/messController.js";
import authUser from "../Middlewares/authMiddlewere.js";

const messageRouter = express.Router();
messageRouter.post("/message", authUser, createMessage);
messageRouter.get("/message/:idChat", getMessage);
messageRouter.post("/unmessage", deleteMessage);

export default messageRouter;
