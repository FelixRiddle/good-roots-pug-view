import fs from "node:fs";

import UserFolder from "../UserFolder.js";

/**
 * Property folder
 */
export default class PropertyFolder {
    constructor(userId, propertyId) {
        this.userId = userId;
        this.propertyId = propertyId;
        
        this.userFolder = new UserFolder(userId);
    }
    
    /**
     * Uses user id and property's to get the relative property folder from public folder
     * 
     * @returns {string} Property folder relative path
     */
    propertyFolder() {
        return `${this.userFolder.propertyFolder()}/${this.propertyId}`;
    }
    
    /**
     * Property images folder
     * 
     * Not using it yet
     * 
     * @returns {string} Property images folder
     */
    propertyImagesFolder() {
        return `${this.propertyFolder()}/images`;
    }
    
    /**
     * Public images path
     * 
     * Gets the route path to the images of the property.
     * 
     * @returns {array} Array of property images relative path from public directory
     */
    publicImagesPath() {
        // Get images from the property folder
        let images = fs.readdirSync(this.propertyFolder(), { withFileTypes: true });
        
        let imagesURI = [];
        for(let image of images) {
            // This is kinda abstractable ngl
            let encodedImageName = encodeURIComponent(image.name);
            
            const imageURI = `${image.path}/${encodedImageName}`;
            
            imagesURI.push(imageURI);
        }
        
        return imagesURI;
    }
    
    /**
     * Images name
     * 
     * Get images name
     * 
     * @returns {array} Array of images name
     */
    imagesName() {
        // Get images from the property folder
        const imageFiles = fs.readdirSync(this.propertyFolder(), { withFileTypes: true });
        
        let images = [];
        for(let image of imageFiles) {
            images.push(image.name);
        }
        
        return images;
    }
}
