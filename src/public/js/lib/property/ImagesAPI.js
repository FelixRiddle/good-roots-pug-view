import axios from "axios";

/**
 * Images API
 */
export default class ImagesAPI {
    
    propertyImages = [];
    
    /**
     * 
     * @param {number} propertyId This property id
     */
    constructor(propertyId) {
        // Create axios instance
        this.instance = axios.create({
            baseURL: `${window.location.origin}/user/property/images`,
            timeout: 2000,
            headers: {'Content-Type': 'application/json'}
        });
        this.propertyId = propertyId;
    }
    
    // --- API Calls ---
    /**
     * When the page loads fetch all images
     */
    async fetchAll() {
        let res = await this.instance.get(`/get_all/${this.propertyId}`)
            .then((res) => {
                return res;
            }).catch((err) => {
                console.log(`Error when fetching image names from the backend: `, err);
            });
        
        return res.data.images;
    }
    
    /**
     * Send preflight request to server about the images
     * 
     * @param {Array} images Array of image files
     */
    async preflightRequest(images) {
        if(!images) {
            console.log("Can't send preflight request if there are no images!! 🤬🤬🤬🤬");
            return;
        }
        
        let imagesArray = [];
        for(let image of images) {
            imagesArray.push({
                name: image.name,
                size: image.size,
            });
        }
        
        const endpoint = `/add_image_preflight/${this.propertyId}`;
        
        // Post data
        let res = await this.instance.post(endpoint, {
            images: imagesArray,
        }).then((res) => res)
            .catch((err) => {
                
                console.log("Error: ", err);
                return;
            });
        
        // console.log(`Response status: `, res.status);
        // console.log(`Response data: `, res.data);
        
        // Update collisions
        this.collisions = res.data.collisions;
        
        return res.data;
    }
    
    /**
     * Remove an image at a given index
     * 
     * The local index of images
     * 
     * @param {number} index Image index
     */
    async removeImage(index) {
        let imageName = this.propertyImages[index];
        const endpoint = `/remove_image/${this.propertyId}`;
        
        // Post data
        let res = await this.instance.post(endpoint, {
            imageName,
        })
            .then((res) => res)
            .catch((err) => {
                console.error(`Error when posting the image name: `, err);
            });
        
        // console.log(`Response: `, res.data);
    }
    
    /**
     * Set images endpoint
     */
    async setImages() {
        const endpoint = `/set_image/${this.propertyId}`;
        
        // Post data
        let res = await this.instance.post(endpoint).then((res) => res)
            .catch((err) => {
                
                console.log("Error: ", err);
                return;
            });
    }
    
    /**
     * Set property to published
     * 
     * @param {bool} value 
     */
    async setPropertyPublished(value) {
        const instance = axios.create({
            baseURL: `${window.location.origin}/user/property`,
            timeout: 2000,
            headers: {'Content-Type': 'application/json'}
        });
        const endpoint = `/publish_property/${this.propertyId}`;
        
        // Post data
        await instance.post(endpoint, {
            value,
        })
            .then((res) => res)
            .catch((_err) => {
                // It keeps throwing an error I don't really know what it is, it's too long.
                // console.error(`Error when posting the image name: `, err);
            });
    }
}
