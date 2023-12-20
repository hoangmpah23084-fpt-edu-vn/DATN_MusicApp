import express from "express";
import {
  addSongInRoom,
  createRoom,
  deleteRoom,
  deleteSongInRoom,
  deleteUserFromRoom,
  getRoom,
  getRooms,
  handUpdateCurrentSongInRoom,
  joinRoom,
  leaveRoom,
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
roomRouter.delete("/leaveroom/:id", authUser, leaveRoom);
roomRouter.post("/dluseroom", authUser, deleteUserFromRoom);

//todo Add Song to list song in room
roomRouter.put("/addSongInRoom/:id", addSongInRoom);
//todo Remove Song from list song in room
roomRouter.put("/dlSongInRoom/:id", deleteSongInRoom);

//todo Curent Song
roomRouter.put("/currentSongRoom/:id", handUpdateCurrentSongInRoom);

export default roomRouter;
