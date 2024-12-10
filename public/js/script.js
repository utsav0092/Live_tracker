const socket = io();  // used to send the connect request in backend

socket.on("connect", function () {
    console.log("Connected to server!");
});
 // check the geolocation facility in your browser
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
    });
}