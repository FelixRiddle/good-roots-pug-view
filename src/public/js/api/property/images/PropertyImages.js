import ImagesAPI from "./ImagesAPI.js";

/**
 * Whole class just to handle property images easily
 * 
 */
export default class PropertyImages {
    #propertyImages = [];
    
    /**
     * 
     */
    constructor(propertyId) {
        this.imagesApi = new ImagesAPI(propertyId);
    }
    
    // --- Set get property images ---
    /**
     * Set property images
     */
    setPropertyImages(images) {
        if(!images) {
            throw new Error("Tried to set undefined to property images");
        }
        
        this.#propertyImages = images;
    }
    
    /**
     * Get images
     * 
     * @returns 
     */
    getImages() {
        return this.#propertyImages;
    }
    
    /**
     * Count images
     * 
     * @returns 
     */
    count() {
        return this.#propertyImages.length;
    }
    
    /**
     * Use public endpoints?
     * 
     * - Can't see unpublished property images
     */
    setPublic() {
        this.imagesApi.setPublic();
    }
    
    // --- Operations ---
    /**
     * Are there more than one property
     */
    exists() {
       return this.#propertyImages.length > 0;
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
        return this.#propertyImages[index];
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
    async updatePropertyImages() {
        const propertyImagesApi = this;
        
        // Fetch property images, if they exist
        await this.imagesApi.fetchAll()
            .then((images) => {
                if(images) {
                    propertyImagesApi.setPropertyImages(images);
                }
                
                propertyImagesApi.callUpdatePropertyCB();
            })
            .catch((err) => {
                console.warn(`Couldn't fetch images, error: `);
                console.error(err);
            });
    }
}
