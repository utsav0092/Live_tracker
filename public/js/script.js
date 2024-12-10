const socket = io();  // used to send the connect request in backend

socket.on("connect", function () {
    console.log("Connected to server!");
});
// check the geolocation facility in your browser
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        // from front-end to back-end
        socket.emit("send-location", { latitude, longitude });
    },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

//using the leaflet for the map
const map = L.map("map").setView([0, 0], 10);
// to see the map with a URL and then add to map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap"
}).addTo(map);

//create an empty object markers
const markers = {};
// receive the response from the back-end io.emit()
socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude], 16);
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    }
    else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

//disconnect the marker
socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id]
    }
});