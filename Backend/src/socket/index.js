import { Server } from "socket.io";

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
    socket.on("trySend", (data) => {
      console.log(data);
      socket.emit("connected");
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
export default ConnectSocket;
