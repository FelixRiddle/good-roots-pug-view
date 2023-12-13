import axios from "axios";

import rootLocation from "./global/location.js";

let loaded = false;

document.addEventListener("DOMContentLoaded", async function() {
    // It loads twice for some reason
    if(loaded) {
        return;
    } else {
        loaded = true;
    }
    
    // If that doesn't cut it
    // try {
    await renderMap();
    // } catch(err) {
    //     console.log(`Error: ${err}`);
    // }
});

/**
 * Fetch location api key
 * 
 * @returns {string} Api key or empty string
 */
async function fetchApiKey() {
    let url = `${rootLocation()}/api/location/apiKey`;
    console.log(`Url: ${url}`);
    
    let apiKey = await axios.get(url)
        .then((res) => res.data.apiKey)
        .catch((err) => {
            console.log(`Couldn't fetch api key, error: ${err}`);
            return "";
        });
    
    return apiKey;
}

/**
 * Render map functionality
 * 
 * Also handles updating stuff in the frontend
 * 
 * FIX: This doesn't work anymore
 */
async function renderMap() {
    // Get api key for location services
    console.log(`Root location: ${rootLocation()}`);
    
    // The linter says it's useless to se await here(maybe becuase of its return type)
    // but if you don't it will still be a promise.
    // Maybe tiny linter bug?
    let apiKey = await fetchApiKey();
    console.log(`Api key: `, apiKey);
    
    // Previous values
    let prev_lat = document.querySelector("#latitude").value;
    let prev_longitude = document.querySelector("#longitude").value;
    
    // Position
    const lat = prev_lat || -33.81672067629844;
    const lng = prev_longitude || -59.510741750004534;
    
    // Set map position/view
    const map = L.map('map').setView([lat, lng ], 16);
    
    // Provider and geocoder
    const geocode = L.esri.Geocoding.geocode({ apiKey });
    const geocodeService = L.esri.Geocoding.geocodeService();
    // const geocodeService = geocode.geocodeService();
    // const geocodeService = L.esri.Geocoding.geocodeService({apiKey});
    
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
                    console.log(`Ok, updating address`);
                    
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
}
