const express = require('express');
const app = express()
const path = require("path");
/**for socket we require http package that is by default pre-installed in node*/
/**boiler plate of socketio */
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server)

/**ejs setup */
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    // accept the emit from script.js
    socket.on("send-location", function (data) {
        //after accepting now return the response
        io.emit("receive-location", { id: socket.id, ...data });
    });
    //handling the disconnection from the script.js.
    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    });
}); // handling the connection request com ingfrom script.js io().

app.get("/", function (req, res) {
    res.render("index");
});

server.listen(3000, function () {
    console.log("Server is running on http://localhost:3000");
});