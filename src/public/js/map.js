import L from "leaflet";

let loaded = false;

document.addEventListener("DOMContentLoaded", function() {
    // It loads twice for some reason
    if(loaded) {
        return;
    } else {
        loaded = true;
    }
    
    // If that doesn't cut it
    try {
        // Previous values
        let prev_lat = document.querySelector("#latitude").value;
        let prev_longitude = document.querySelector("#longitude").value;
        
        // Position
        const lat = prev_lat || -33.81672067629844;
        const lng = prev_longitude || -59.510741750004534;
        
        // Set map position/view
        const map = L.map('map').setView([lat, lng ], 16);
        
        // Provider and geocoder
        const geocodeService = L.esri.Geocoding.geocodeService();
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add a marker/pin
        // So that the user can pin where the house for renting/selling is.
        let pin = new L.marker([
            lat,
            lng
        ], {
            draggable: true,
            autoPan: true,
        }).addTo(map);
        
        // Detect when the pin has finished being moved
        pin.on("moveend", (e) => {
            pin = e.target;
            
            // Get latitude and longitude
            const position = pin.getLatLng();
            
            // Center map to the new position
            map.panTo(new L.LatLng(position.lat, position.lng));
            
            // Obtain street information when releasing the pin
            geocodeService
                .reverse()
                .latlng(position, 13)
                .run((err, result) => {
                    if(result) {
                        pin.bindPopup(result.address.LongLabel);
                        
                        // Fill fields
                        document.querySelector(".street").textContent = result?.address?.Address ?? "";
                        document.querySelector("#street").value = result?.address?.Address ?? "";
                        document.querySelector("#latitude").value = result?.latlng?.lat ?? "";
                        document.querySelector("#longitude").value = result?.latlng?.lng ?? "";
                    } else {
                        console.log(`Result doesn't exist.`);
                        console.log(err);
                    }
                });
        });
    } catch(err) {
        console.log(`Error: ${err}`);
    }
});
