const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;

let truckSocket = null;
let passengerSocket = null;

io.on("connection", (socket) => {
  console.log("L", "a user connected =D");

  socket.on("truckRequest", (routeResponse) => {
    console.log("Someone is looking for a truck!");
    passengerSocket = socket;
    if (truckSocket != null) {
      truckSocket.emit("truckRequest", routeResponse);
    }
  });

  socket.on("lookingClient", () => {
    console.log("Looking for Client!");
    truckSocket = socket;
  });

  socket.on("driverLocation", (driverLocation) => {
    passengerSocket.emit("driverLocation", driverLocation);
  });
});

server.listen(port, () => console.log("L", "server running..."));
