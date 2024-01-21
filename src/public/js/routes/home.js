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
    const resData = await propApi.fetchAll();
    const properties = resData.properties;
    
    console.log(`Properties: `, properties);
    
    for(const property of properties) {
        const marker = new L.marker([
            property.latitude,
            property.longitude
        ], {
            autoPan: true,
        }).addTo(map)
        .bindPopup(`
        <p class="text-indigo-600 font-bold">${property.category.name}</p>
        <h1 class="text-xl font-extrabold uppercase my-2">${property.title}</h1>
        <img src="" alt="Imagen de la propiedad ${property.title}"/>
        <p class="text-gray-600 font-bold">${property.price.name}</p>
        <a href="${location.origin}/property/view/${property.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase rounded">Go to property<a/>
        `);
    }
}

(async() => {
    await createMapOn();
})();
