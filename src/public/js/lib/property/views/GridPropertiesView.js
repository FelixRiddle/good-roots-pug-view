import PropertyAPI from "../../../api/property/PropertyAPI.js";
import { updatePropertyImages } from "../images/index.js";

/**
 * Grid properties view
 */
export default class GridPropertiesView {
    constructor() {
        
    }
    
    /**
     * Setup, updates everything in order
     * 
     */
    async setup() {
        await this.updateProperties();
        
        this.updatePropertyImages();
    }
    
    /**
     * Update property images
     */
    updatePropertyImages() {
        for(const property of this.properties) {
            // Element id
            const elId = `grid_property_image_${property.id}`;
            
            // Get element
            const el = document.getElementById(elId);
            if(el) {
                // Set the first image as its main
                el.src = property.images[0];
            } else {
                console.warn(`A property grid image element couldn't be found!!`);
            }
        }
    }
    
    /**
     * Fetch properties
     */
    async updateProperties() {
        this.propertyApi = new PropertyAPI();
        const resData = await this.propertyApi.fetchAll();
        const responseProperties = resData.properties;
        
        // --- Set properties image ---
        const properties = await updatePropertyImages(responseProperties);
        
        this.properties = properties;
    }
}
