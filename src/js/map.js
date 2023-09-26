(() => {
    // Position
    const lat = -33.81672067629844;
    const lng = -59.510741750004534;
    
    // Set map position/view
    const map = L.map('map').setView([lat, lng ], 16);
    
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
    });
    
})();
