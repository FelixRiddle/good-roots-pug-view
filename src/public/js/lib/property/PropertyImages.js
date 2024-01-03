import ImagesAPI from "./ImagesAPI.js";

/**
 * Whole class just to handle property images easily
 * 
 */
export default class PropertyImages {
    /**
     * 
     * @param {ImagesAPI} imagesAPI 
     */
    constructor(imagesAPI) {
        this.api = imagesAPI;
    }
    
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
            thisClass.api.propertyImages = images;
            
            thisClass.updatePropertyCallback();
        });
    }
}
