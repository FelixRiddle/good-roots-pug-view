
// Create map
let map = L.map("map").setView([51.505, -0.09], 13);

// Add tile layer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Create a marker
let marker = L.marker([51.5, -0.09]).addTo(map);

// Add a circle
let circle = L.circle([51.508, -0.11], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
}).addTo(map);

// Polygon
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

// Add a popup
marker.bindPopup("<b>Hello world!</b><br>I am a pop up.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon");

// Popup as layers
const popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("Standalone popup")
    .openOn(map);

const pop = L.popup();

// Event
function onMapClick(e) {
    pop.setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on("click", onMapClick);
