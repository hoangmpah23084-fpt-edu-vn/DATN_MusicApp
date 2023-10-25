import { Server } from "socket.io";

const ConnectSocket = (server) => {
  //todo Socket Server
  const io = new Server(server, {
    //todo nếu 60s ko có ai send request thì nó sẽ disconnect
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });
  io.on("connection", (socket) => {});
  console.log("connected socket io success");
};
export default ConnectSocket;
