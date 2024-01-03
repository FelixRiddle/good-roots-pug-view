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
     * Update property images
     */
    updatePropertyImages() {
        // Fetch property images, if they exist
        let propertyImages = Promise.resolve(this.api.fetchAll());
        let thisClass = this;
        propertyImages.then((images) => {
            // console.log(`Response: `, images);
            // thisClass.propertyImages = images;
            // thisClass.previousImages = images;
            // thisClass.api.propertyImages = images;
            thisClass.propertyImages = images;
            
            thisClass.updatePropertyCallback();
        });
    }
}
