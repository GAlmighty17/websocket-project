const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`One user connected ${socket.id}`);
  socket.emit("your-id", socket.id);
  socket.on("update-counter", (count) => {
    console.log("updating counter", count);
    io.emit("sync-counter", count);
  });
});

server.listen(6767, () => {
  console.log("server is running on port 6767");
});
