import { Marker } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

/**
 * Class to mark a single position in a map
 */
class MarkPositionManager {
    
    /**
     * Position marker map class
     */
    constructor() {
        // Create map
        this.createMap();
        
        // Marker
        this.createMarker();
        
        this.bindMarkerToClickPosition();
        this.setMarkerPopupInfo();
        this.setMarkerColor();
        
        // Geocoding
        this.bindSearchGeocoding();
    }
    
    /**
     * Create map
     */
    createMap() {
        // Create map
        let map = L.map("map").setView([51.505, -0.09], 13);

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
        let marker = L.marker([51.5, -0.09], {
            draggable: true,
            autoPan: true,
        }).addTo(this.map);
        this.marker = marker;
    }
    
    /**
     * Sets pop up information
     */
    setMarkerPopupInfo() {
        // Set popup information
        this.marker.bindPopup("<b>Property location</b>");
    }
    
    /**
     * Sets marker color
     */
    setMarkerColor() {
        // Set color to fuccia
        const fuccia = "hue-rotate(120deg)";
        this.marker._icon.style.filter = fuccia;
    }
    
    /**
     * Binds click event to set the marker to the click position
     * 
     */
    bindMarkerToClickPosition() {
        // Update marker position on click
        this.map.addEventListener("click", (e) => {
            // Update marker position
            this.marker.setLatLng(e.latlng);
        });
    }
    
    // --- Geocoding ---
    /**
     * Bind search geocoding to a map
     * 
     */
    bindSearchGeocoding() {
        // Use openstreetmap as provider
        const provider = new OpenStreetMapProvider();
        
        // GeoSearchControl??
        const searchControl = new GeoSearchControl({
            noutFoundMessage: "Sorry, the given address couldn't be found.",
            provider,
            style: "bar"
        });
        
        // Add it to the map
        this.map.addControl(searchControl);
    }
}

let markPos = new MarkPositionManager(map);

// // Add control
// let control = L.Control.geocoder();
// control.addTo(map);
