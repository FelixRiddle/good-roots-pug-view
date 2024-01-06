import { Marker } from "leaflet";

/**
 * Class to mark a single position in a map
 */
export default class PropertyMapView {
    userPositionSet = false;
    
    /**
     * Position marker map class
     * 
     * @param {string} [elementId="map"] Map element id
     */
    constructor(elementId = "map") {
        // Get property coordinates
        const latitude = document.getElementById("latitude").textContent;
        const longitude = document.getElementById("longitude").textContent;
        this.latitude = latitude;
        this.longitude = longitude;
        
        // Create map
        this.createMap(elementId);
        
        // Marker
        this.createMarker();
        
        this.setMarkerPopupInfo();
        this.setMarkerColor();
    }
    
    // --- Create stuff ---
    /**
     * Create map
     */
    createMap(elementId) {
        // Create map
        let map = L.map(elementId).setView([this.latitude, this.longitude], 16);

        // Add tile layer
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        this.map = map;
    }
    
    // --- Marker ---
    /**
     * Create and set this class marker
     */
    createMarker() {
        // Create a marker
        let marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
        this.marker = marker;
    }
    
    /**
     * Sets pop up information
     * 
     * @param {string} [street=""] Add a street location to the popup
     */
    setMarkerPopupInfo(street = "") {
        // Set popup information
        this.marker.bindPopup(
            // Br is '\n'
            `<b>Property location</b><br><p>${street}</p>`
        );
        
        // Open popup on change
        // this.marker.openPopup();
    }
    
    /**
     * Sets marker color
     */
    setMarkerColor() {
        // Set color to fuccia
        const fuccia = "hue-rotate(120deg)";
        this.marker._icon.style.filter = fuccia;
    }
    
    // --- Callbacks ---
    /**
     * Set position change callback
     * 
     * @param {function} cb Callback to call on position change
     */
    setPositionChangeCallback(cb) {
        this.positionChangeCallback = cb;
    }
}
