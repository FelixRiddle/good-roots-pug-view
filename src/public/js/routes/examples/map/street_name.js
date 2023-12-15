import { Marker } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import rootLocation from "../../../global/location.js";
import axios from "axios";

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
        this.bindMarkerDragendUpdatePosition();
        
        // User position
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
        this.map.addEventListener("click", async (e) => {
            // Update marker position
            this.marker.setLatLng(e.latlng);
            await this.onMarkerChangePosition();
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
        
        const searchControl = new GeoSearchControl({
            noutFoundMessage: "Sorry, the given address couldn't be found.",
            provider,
            style: "bar"
        });
        
        // Add it to the map
        this.map.addControl(searchControl);
    }
    
    /**
     * On marker change position
     * 
     * Call this function each time the marker changes position
     * This is done in the backend, because leaflet plugin didn't work for me D:.
     */
    async onMarkerChangePosition() {
        let coordinates = this.marker.getLatLng();
        console.log(`Coordinates: `, coordinates);
        
        let client = axios.create({
            baseUrl: rootLocation(),
            timeout: 2000,
            headers: {
                "Content-Type": "application/json",
            }
        });
        
        let response = await client.post("/api/location/map/geocoding/reverse", coordinates).then((res) => res)
            .catch((err) => {
                console.log(`Error when reverse geocoding the coordinates.`);
                console.log(`Error: `, err);
            });
        
        console.log(`Response: `, response.body);
        
        this.street = "";
    }
    
    /**
     * On marker drag end call onMarkerChangePosition
     */
    bindMarkerDragendUpdatePosition() {
        this.marker.addEventListener("dragend", async (pos) => {
            this.onMarkerChangePosition();
        });
    }
}

let markPos = new MarkPositionManager();
