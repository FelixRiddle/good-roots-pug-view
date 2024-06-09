import PropertyAPI from "../../../api/property/PropertyAPI.js";

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
        console.log(`Setting property images`);
        for(const property of this.properties) {
            // Element id
            const elId = `grid_property_image_${property.id}`;
            
            // Get element
            const el = document.getElementById(elId);
            // console.log(`Property: `, property);
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
        
        // Properties now come with the images
        const properties = resData.properties;
        
        this.properties = properties;
    }
}
