import axios from "axios";

/**
 * Image editor
 * 
 * API to communicate with the backend
 */
export default class ImageEditor {
    imagesView = [];
    
    propertyImages = [];
    previousImages = [];
    
    // Collisions
    // Files that have collided with others in the backend will be set here
    collisions = [];
    
    /**
     * Create a new image editor
     * 
     * @param {string} inputId Input ID
     */
    constructor(inputId) {
        // Create axios instance
        this.instance = axios.create({
            baseURL: `${window.location.origin}/user/property/images`,
            timeout: 2000,
            headers: {'Content-Type': 'application/json'}
        });
        this.inputId = inputId;
        
        // Get property id
        const paths = window.location.pathname.split("/");
        const propertyId = paths[paths.length - 1];
        this.propertyId = propertyId;
        
        // Fetch property images, if they exist
        let propertyImages = Promise.resolve(this.fetchAll());
        let thisClass = this;
        propertyImages.then((images) => {
            console.log(`Response: `, images);
            thisClass.propertyImages = images;
            thisClass.previousImages = images;
        });
        
        // Get every image view
        for(let i = 0; i < 10; i++) {
            let imgView = document.getElementById(`image_${i}`);
            if(imgView) {
                this.imagesView.push(imgView);
            } else {
                console.log(`Image view ${i} couldn't be found!`);
            }
        }
    }
    
    // --- Events ---
    /**
     * On change send request to the server to check whether the file is ready to be
     * uploaded or it collides with another image
     */
    bindOnChange() {
        const imagesInput = document.getElementById(this.inputId);
        if(imagesInput) {
            // I had problems once for using 'this' keyword inside an event listener, so I rather
            // not do that.
            let thisObject = this;
            imagesInput.addEventListener("change", async (e) => {
                console.log("Images changed");
                
                // TODO: Check that these are not the previous images
                
                // Files
                console.log("Selected files: ", imagesInput.files);
                console.log("File: ", imagesInput.value);
                
                let res = await thisObject.preflightRequest(imagesInput.files);
            });
        } else {
            console.log(`The element with id 'images' couldn't be found!!!! 😡😡😡`);
        }
    }
    
    // --- API Endpoints ---
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
        
        console.log(`Response status: `, res.status);
        console.log(`Response data: `, res.data);
        
        // Update collisions
        this.collisions = res.data.collisions;
        
        return res.data;
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
}
