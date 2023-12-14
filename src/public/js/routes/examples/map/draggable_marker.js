// Check if map container was initialized
let initialized = false;

// This event listener is unnecesary, but in the console will appear an error
// and you may be tricked into wasting time to fix the error, so it's better to just prevent it
// by using this event.
// Added a lot of checks, yet the error still appears.
document.addEventListener("DOMContentLoaded", function() {
    let mapElement = document.getElementById("map");
    if(!mapElement) {
        // Couldn't find the map
        return;
    }
    
    if(!initialized) {
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
        
        marker.addEventListener("dragend", (e) => {
            
            // Marker position
            console.log(`New marker position: `, marker.getLatLng());
            
            // Or get it through target
            console.log(`Target: `, e.target.getLatLng());
        });
        
        initialized = true;
    }
});
