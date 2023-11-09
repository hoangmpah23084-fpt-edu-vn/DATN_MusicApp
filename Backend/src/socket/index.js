import { Server } from "socket.io";
import roomModel from "../Models/roomChatModel.js";
import model_user from "../Models/model_user.js";
const ConnectSocket = (server) => {
  //todo Socket Server
  const io = new Server(server, {
    //todo nếu 60s ko có ai send request thì nó sẽ disconnect
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:5173",
      //todo các method có thể dùng cho socket
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });
  io.on("connection", (socket) => {
    console.log("connected socket io success");
    socket.on("joinRoom", (value) => {
      //todo value => idRoom
      socket.join(value);
    });
    socket.on("setUser", (value) => {
      //todo value => User
      socket.join(value._id);
    });
    socket.on("newMessage", async (value) => {
      const getOneRoom = await roomModel
        .findById(value.id_room)
        .populate("memberGroup", "-password")
        .populate("isAdminGroup", "-password")
        .populate("listMessages", "-password -id_room")
        .then(async (result) => {
          result = await model_user.populate(result, {
            path: "listMessages.id_sender",
            select: "fullName",
          });
          return result;
        });
      getOneRoom.memberGroup.forEach(async (item) => {
        // if (item._id == value.id_sender) return;
        //todo send value for all members from group except yourself
        const fetUser = await model_user.findById(value.id_sender);
        value.id_sender = {
          _id: fetUser._id,
          fullName: fetUser.fullName,
        };
        // console.log(value.id_room);
        //todo to : gửi cho tất cả mọi người kể cả tôi
        socket.to(value.id_room).emit("messRecived", value);
      });
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
export default ConnectSocket;
