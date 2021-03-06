import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(wsServer.sockets.adapter);
    console.log(`Socket Event:${event}`);
  });

  socket.on("join_room", (roomName) => {
    console.log(`I'm ${socket.id}`);
    socket.join(roomName);
    console.log(`${socket.id} join ${roomName}`);

    socket.to(roomName).emit("welcome");
    console.log(socket.rooms);
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});

const handleListen = () => console.log(`Listening on http://localhost:8080`);

httpServer.listen(8080, handleListen);
