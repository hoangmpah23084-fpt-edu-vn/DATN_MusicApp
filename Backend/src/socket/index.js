import { Server } from "socket.io";
import roomModel from "../Models/roomChatModel.js";
import model_user from "../Models/model_user.js";
const ConnectSocket = (server) => {
  //todo Socket Server
  const io = new Server(server, {
    //todo nếu 60s ko có ai send request thì nó sẽ disconnect
    pingTimeout: 60000,
    cors: {
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
      //todo các method có thể dùng cho socket
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });
  io.on("connection", (socket) => {
    console.log("connected socket io success");
    socket.on("joinRoom", async (value) => {
      socket.join(value);
      const dataRoom = await roomModel.findById(value).populate("listSong");
      console.log(dataRoom);
      // Lấy danh sách các phòng mà socket đang tham gia
      const rooms = Object.keys(socket.rooms);

      // Kiểm tra số người trong phòng
      const roomName = value;
      // console.log(roomName);
      const numberOfClients = io.sockets.adapter.rooms.get(roomName)?.size || 0;
      console.log(numberOfClients >= 2, numberOfClients);
      //todo if length person >= 2 send request to own room
      if (numberOfClients >= 2) {
        socket.to(roomName).emit("Welcome", value);
        socket.to(roomName).emit("resetUser", value);
      }
    });
    socket.on("currentTimeSong", (value) => {
      if (value.currentTime) {
        console.log(value);
        socket.to(value.idroom).emit("serverCurrentTimeSong", value);
      }
    });
    socket.on("setUser", (value) => {
      //todo value => User
      socket.join(value);
    });
    //? toggPlayPause
    socket.on("toggPlayPause", (value) => {
      socket.to(value.idroom).emit("recivedHandTogg", value);
    });
    socket.on("emitNextClient", (value) => {
      socket.to(value).emit("emitNextServer", value);
    });
    socket.on("emitPrevClient", (value) => {
      socket.to(value).emit("emitPrevServer", value);
    });
    socket.on("handRewindClient", (value) => {
      socket.to(value.idroom).emit("handRewindServer", value);
    });
    socket.on("randomSongClient", (value) => {
      socket.to(value.idroom).emit("randomSongServer", value);
    });
    socket.on("repeatClient", (value) => {
      socket.to(value.idroom).emit("repeatServer", value);
    });
    socket.on("clientStartSongSideBar", (value) => {
      console.log(value);
      socket.to(value.idroom).emit("serverStartSongSideBar", value);
    });
    socket.on("deleteSongInRoom", (value) => {
      // console.log(value);
      socket.to(value.idroom).emit("serverDeleteSongInRoom", value);
    });
    socket.on("addSongInListRoom", (value) => {
      socket.to(value.idroom).emit("serverAddSongInListRoom", value);
    });
    socket.on("autoNextSong", (value) => {
      socket.to(value.idroom).emit("serverAutoNextSong", value);
    });
    socket.on("leaveRoomAdmin", (value) => {
      // console.log("LeaveRoomAdmin event received:", value);
      socket.in(value.idroom).emit("serverLeaveRoomAdmin", value);
    });
    socket.on("leaveRoomPerson", (value) => {
      // console.log("leaveRoomPerson event received:", value);
      socket.to(value.idroom).emit("serverLeaveRoomPerson", value);
    });
    socket.on("setRandomSong", (value) => {
      // console.log("leaveRoomPerson event received:", value);
      socket.in(value.idroom).emit("serverSetRandomSong", value);
    });
    socket.on("takeSongWhenJoin", (value) => {
      // console.log("leaveRoomPerson event received:", value);
      socket.in(value.idroom).emit("setverTakeSongWhenJoin", value);
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
        //todo send value for all members from group except yourself
        const fetUser = await model_user.findById(value.id_sender);
        value.id_sender = {
          _id: fetUser._id,
          fullName: fetUser.fullName,
        };
        //todo to : gửi cho tất cả mọi người kể cả tôi
        socket.to(value.id_room).emit("messRecived", value);
      });
    });

    socket.on("disconnectClient", () => {
      console.log("Disconnect user");
      socket.disconnect();
    });
    socket.on("disconnect", () => {
      socket.disconnect();
      console.log("A user disconnected");
    });
  });
};
export default ConnectSocket;
