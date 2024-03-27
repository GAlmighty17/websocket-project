const { createServer } = require("http");
const { WebSocketServer, WebSocket } = require("ws");

const server = createServer();
const wss = new WebSocketServer({ server });

function broadcastToOthers(wsServer, websocket, message) {
  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== websocket) {
      client.send(message);
    }
  });
}

wss.on("connection", (ws) => {
  console.log("One user connected ");

  ws.on("message", (data) => {
    const stringData = data.toString();
    const [type, message] = stringData.split(",");
    if (type === "syncCounter") {
      broadcastToOthers(wss, ws, `updateCounter,${message}`);
    }
  });

  ws.send("success");
});

server.listen(6767, () => {
  console.log("server is running on port 6767");
});
