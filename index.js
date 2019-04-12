var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});

io.on("connection", function(socket) {
  console.log("user connected (" + socket.id + ")");
  io.to(socket.id).emit("chat message", "You are connected!");

  socket.on("disconnect", function() {
    io.to(socket.id).emit("chat message", "You have been disconnected.");
    console.log("user disconnected (" + socket.id + ")");
  });
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
});
