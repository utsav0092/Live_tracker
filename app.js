const express = require('express');
const app = express()
/**for socket we require http package that is by default pre-installed in node*/
/**boiler plate of socketio */
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server)

/**ejs setup */
app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.send("hey there");
});

server.listen(3000);
console.log("http://localhost:3000");