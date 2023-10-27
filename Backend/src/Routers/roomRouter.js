import express from "express";
import {
  createRoom,
  deleteRoom,
  deleteUserFromRoom,
  getRoom,
  getRooms,
  joinRoom,
  updateRoomChat,
} from "../Controllers/roomController.js";
import authUser from "../Middlewares/authMiddlewere.js";

const roomRouter = express.Router();
roomRouter.post("/room", authUser, createRoom);
roomRouter.put("/updateroom/:idChat", authUser, updateRoomChat);
roomRouter.get("/room/:idChat", getRoom);
roomRouter.get("/room", getRooms);
roomRouter.delete("/room/:idChat", deleteRoom);
roomRouter.post("/joinroom", authUser, joinRoom);
roomRouter.post("/dluseroom", authUser, deleteUserFromRoom);

export default roomRouter;
