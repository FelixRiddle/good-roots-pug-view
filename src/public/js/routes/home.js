import PropertyAPI from "../api/property/PropertyAPI.js";

class StartPage {
    map = null;
    filter = {
        category: "",
        price: "",
    };
    
    constructor() {
        // this.map = map;
    }
    
    /**
     * Call at start
     */
    async start() {
        this.createMapOn();
        await this.fetchProperties();
        
        this.updateMapMarkers();
        this.setupFilters();
        
        console.log(`Setup completed`);
    }
    
    /**
     * Enable filters
     */
    setupFilters() {
        // Get category
        const categoryElement = document.getElementById("category");
        if(!categoryElement) {
            console.warn("Category element not found, disabling filters!");
            return;
        }
        
        // Get price
        const priceElement = document.getElementById("price");
        if(!priceElement) {
            console.warn("Price element not found, disabling filters!");
            return;
        }
        
        const thisObj = this;
        
        // Enable setting filters for category
        categoryElement.addEventListener("change", (e) => {
            thisObj.filter.category = parseInt(e.target.value);
        });
        
        // Enable setting filters for price
        priceElement.addEventListener("change", (e) => {
            thisObj.filter.price = parseInt(e.target.value);
        });
        
        console.log(`Filters enabled`);
    }
    
    /**
     * Create map
     * 
     * @param {string} elementId 
     */
    createMapOn(elementId="map") {
        // Get price
        const el = document.getElementById(elementId);
        if(!el) {
            console.warn("Element with id 'map' doesn't exists");
            return;
        }
        
        const map = L.map(elementId).setView([37.7750224, -122.4536641], 13);
        
        // Add tile layer
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        console.log(`Map created!`);
        
        this.map = map;
    }
    
    /**
     * Update map things
     */
    updateMapMarkers() {
        if(!this.map) {
            console.log(`The map doesn't exists!`);
            return;
        }
        
        for(const property of this.properties) {
            const marker = new L.marker([
                property.latitude,
                property.longitude
            ], {
                autoPan: true,
            }).addTo(this.map)
            .bindPopup(`
            <p class="text-indigo-600 font-bold">${property.category.name}</p>
            <h1 class="text-xl font-extrabold uppercase my-2">${property.title}</h1>
            <img src="" alt="Imagen de la propiedad ${property.title}"/>
            <p class="text-gray-600 font-bold">${property.price.name}</p>
            <a href="${location.origin}/property/view/${property.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase rounded">Go to property<a/>
            `);
        }
    }
    
    /**
     * Fetch properties
     */
    async fetchProperties() {
        this.propertyApi = new PropertyAPI();
        const resData = await this.propertyApi.fetchAll();
        const properties = resData.properties;
        this.properties = properties;
        
        console.log(`Properties: `, properties);
    }
}

(async() => {
    const startPage = new StartPage();
    await startPage.start();
})();
