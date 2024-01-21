import PropertyAPI from "../api/property/PropertyAPI.js";

/**
 * Create map
 * 
 * @param {string} elementId 
 */
async function createMapOn(elementId="map") {
    const map = L.map(elementId).setView([37.7750224, -122.4536641], 13);
    
    // Add tile layer
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    console.log(`Map created!`);
    
    const propApi = new PropertyAPI();
    const properties = await propApi.fetchAll();
    
    console.log(`Properties: `, properties);
}

(async() => {
    await createMapOn();
})();
