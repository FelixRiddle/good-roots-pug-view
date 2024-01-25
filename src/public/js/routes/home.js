import PropertyAPI from "../api/property/PropertyAPI.js";
import ImagesAPI from "../lib/property/ImagesAPI.js";
import PropertyImages from "../lib/property/PropertyImages.js";

class PropertiesMap {
    map = null;
    filter = {
        category: undefined,
        price: undefined,
    };
    showProperties = [];
    markers = [];
    
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
    
    // --- Filters ---
    /**
     * Check if there's at least one filter
     * 
     * It uses an 'or' because it checks if at least ONE filter is on
     */
    filterExists() {
        const customFilter = this.filter;
        return typeof(customFilter.category) !== typeof(undefined) || typeof(customFilter.price) !== typeof(undefined);
    }
    
    /**
     * Filter properties
     * 
     * After each filter update, or property update, call this function
     */
    filterProperties() {
        console.log(`Current filters: `, this.filter);
        const thisObj = this;
        const customFilter = this.filter;
        
        // Filter properties
        const result = this.properties.filter((prop) => {
            
            // Check that there's a custom filter
            // If there's none, just return the property
            if(!thisObj.filterExists()) {
                return prop;
            }
            
            // Filter by category
            if(typeof(customFilter.category) !== typeof(undefined)) {
                // Check that the property category matches the filter category
                // For this we will return undefined for each property that doesn't matches
                
                // If they don't match, return undefined
                if(prop.category.id !== customFilter.category) {
                    return;
                }
            }
            
            // Filter by price
            if(typeof(customFilter.price) !== typeof(undefined)) {
                if(prop.price.id !== customFilter.price) {
                    return;
                }
            }
            
            // Filters Ok
            // Just return the property
            return prop;
        });
        
        this.showProperties = result;
        console.log(`Properties that match filters: `, result);
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
            
            // Update markers
            thisObj.updateMapMarkers();
        });
        
        // Enable setting filters for price
        priceElement.addEventListener("change", (e) => {
            thisObj.filter.price = parseInt(e.target.value);
            
            // Update markers
            thisObj.updateMapMarkers();
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
        
        // This doesn't work
        map.on("load", function (e) {
            console.log(`Map loaded!`);
        });
        
        // Add tile layer
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        console.log(`Map created!`);
        
        this.map = map;
    }
    
    // --- Property markers ---
    /**
     * Delete all markers
     */
    deleteAllMarkers() {
        // Delete previous markers
        if(this.markers.length > 0) {
            for(const marker of this.markers) {
                this.map.removeLayer(marker);
            }
        }
    }
    
    /**
     * Create filter markers
     */
    createFilterMarkers() {
        console.log(`Show properties: `, this.showProperties);
        for(const property of this.showProperties) {
            const marker = new L.marker([
                property.latitude,
                property.longitude
            ], {
                autoPan: true,
            }).addTo(this.map)
            .bindPopup(`
            <p class="text-indigo-600 font-bold">${property.category.name}</p>
            <h1 class="text-xl font-extrabold uppercase my-2">${property.title}</h1>
            
            <!-- Image -->
            <img src="" alt="Image of the property ${property.title}"/>
            
            <p class="text-gray-600 font-bold">${property.price.name}</p>
            <a href="${location.origin}/property/view/${property.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase rounded">Go to property<a/>
            `);
            
            // Add to the list of markers
            this.markers.push(marker);
        }
    }
    
    /**
     * Create markers for each property
     */
    createPropertyMarkers() {
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
            
            // Add to the list of markers
            this.markers.push(marker);
        }
    }
    
    /**
     * Update map things
     */
    updateMapMarkers() {
        if(!this.map) {
            console.log(`The map doesn't exists!`);
            return;
        }
        
        // Filter properties 
        this.filterProperties();
        
        // Re-Create the markers
        this.deleteAllMarkers();
        this.createFilterMarkers();
    }
    
    // --- Miscellaneous ---
    /**
     * 
     * @param {Array} properties Array of properties
     * @returns {Array} Properties with the field 'images' that has a url pointing to the image.
     */
    updatePropertyImages(properties) {
        for(const property in properties) {
            // Images API
            const imagesApi = new ImagesAPI(property.id);
            
            // Property images
            const propertyImages = new PropertyImages(imagesApi);
            
            // Set it back to the api, wondering if this is ok?
            imagesApi.setPropertyImagesObject(propertyImages);
            
            // This is a goddam mess
            // Images will be updated only once
            propertyImages.setUpdatePropertyCallback(() => {
                console.log(`Property '${property.title}', images fetch!`);
            
                // Get property images
                const newPropertyImages = propertyImages.getAll();
                let index = 0;
                property.images = [];
                for(const imgLocation of newPropertyImages) {
                    // Set image source
                    const imgSource = `${location.origin}/${imgLocation}`;
                    
                    // Push the source
                    property.images.push(imgSource);
                    
                    index++;
                }
            });
            
            // Get property images
            propertyImages.updatePropertyImages();
        }
        
        return properties;
    }
    
    // --- Api calls ---
    /**
     * Fetch properties
     */
    async fetchProperties() {
        this.propertyApi = new PropertyAPI();
        const resData = await this.propertyApi.fetchAll();
        let properties = resData.properties;
        
        // --- Set properties image ---
        properties = this.updatePropertyImages(properties);
        
        this.properties = properties;
        
        // Update markers
        this.updateMapMarkers();
        
        console.log(`Properties(with images): `, properties);
    }
}

(async() => {
    const propsMap = new PropertiesMap();
    await propsMap.start();
})();
