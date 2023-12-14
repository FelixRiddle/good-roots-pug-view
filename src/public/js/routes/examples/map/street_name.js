import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

// Create map
let map = L.map("map").setView([51.505, -0.09], 13);

// Add tile layer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Create a marker
let marker = L.marker([51.5, -0.09], {
    draggable: true,
    autoPan: true,
}).addTo(map);
console.log(`Marker postion: `, marker.getLatLng());

// Set popup information
marker.bindPopup("<b>Property location</b>");
// Set color to fuccia
const fuccia = "hue-rotate(120deg)";
marker._icon.style.filter = fuccia;

// Unnecessary though
// Dragend event
marker.addEventListener("dragend", (e) => {
    
    // Marker position
    console.log(`New marker position: `, marker.getLatLng());
    
    // Or get it through target
    console.log(`Target: `, e.target.getLatLng());
});

// Update marker position on click
map.addEventListener("click", (e) => {
    // Update marker position
    marker.setLatLng(e.latlng);
});

// Use openstreetmap as provider
const provider = new OpenStreetMapProvider();
// GeoSearchControl??
const searchControl = new GeoSearchControl({
    noutFoundMessage: "Sorry, the given address couldn't be found.",
    provider,
    style: "bar"
});

// Add it to the map
map.addControl(searchControl);
console.log(`Search added`);
