import ImagesAPI from "./ImagesAPI.js";

/**
 * Whole class just to handle property images easily
 * 
 */
export default class PropertyImages {
    propertyImages = [];
    
    /**
     * 
     * @param {ImagesAPI} imagesAPI 
     */
    constructor(imagesAPI) {
        this.api = imagesAPI;
    }
    
    // --- Operations ---
    /**
     * Are there more than one property
     */
    exists() {
       return this.propertyImages.length > 0;
    }
    
    /**
     * Get all
     */
    getAll() {
        return this.propertyImages;
    }
    
    /**
     * Get all images url
     * 
     * Converts the property images location to image urls, using 'location.origin' as the base url.
     * 
     * @returns {Array} Array of images url
     */
    getAllImagesUrl() {
        // Create image views
        const propertyImages = this.getAll();
        let index = 0;
        let imagesUrl = [];
        
        for(const imgLocation of propertyImages) {
            // Set image source
            const imgSource = `${location.origin}/${imgLocation}`;
            
            // Insert into the carousel view
            imagesUrl.push(imgSource);
            
            index++;
        }
        
        return imagesUrl;
    }
    
    /**
     * Get array of names only
     */
    names() {
        return this.propertyImages.map((img) => {
            const parts = img.split("/");
            
            // Remember it's encoded
            const encodedName = parts[parts.length - 1];
            
            // Decode it
            return decodeURI(encodedName);
        });
    }
    
    /**
     * Compare an array of names and get the elements that intersect with property image names
     * 
     * This is used for determining extra images that exceed the maximum limit.
     * 
     * @param {Array} imageNames Image names
     */
    namesIntersection(imageNames) {
        return this.names.filter(element => imageNames.includes(element));
    }
    
    /**
     * Get element at
     * 
     * @param {number} index Property image index
     */
    at(index) {
        return this.propertyImages[index];
    }
    
    // --- Special ---
    /**
     * Update property callback
     * 
     * @param {function} cb Callback
     */
    setUpdatePropertyCallback(cb) {
        this.updatePropertyCallback = cb;
    }
    
    /**
     * Call update property callback
     */
    callUpdatePropertyCB() {
        // Check if it exists
        if(this.updatePropertyCallback) {
            this.updatePropertyCallback();
        }
    }
    
    /**
     * Update property images
     */
    updatePropertyImages() {
        // Fetch property images, if they exist
        let propertyImages = Promise.resolve(this.api.fetchAll());
        let thisClass = this;
        propertyImages.then((images) => {
            thisClass.propertyImages = images;
            
            thisClass.callUpdatePropertyCB();
        });
    }
    
    /**
     * Update but async
     */
    async updatePropertyImagesAsync() {
        // Fetch property images, if they exist
        const propertyImages = await this.api.fetchAll();
        this.propertyImages = propertyImages;
        
        this.callUpdatePropertyCB();
        
        return propertyImages;
    }
}
