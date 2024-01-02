import axios from "axios";

// Styling
import "../../../css/components/property/ImageEditor.scss";

const REMOVE_ICON = `${location.origin}/image/icons/cross/1/32.png`;

/**
 * Image editor
 * 
 * API to communicate with the backend
 */
export default class ImageEditor {
    previousImagesInputLength = 0;
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
        
        this.updatePropertyImages();
        this.startAddImageViews();
        this.updateImageViews();
    }
    
    // Start operations
    /**
     * Add image views
     */
    startAddImageViews() {
        // Get every image view
        for(let i = 0; i < 10; i++) {
            let imgView = document.getElementById(`image_${i}`);
            if(imgView) {
                this.imagesView.push(imgView);
            } else {
                console.log(`Image view ${i} couldn't be found!`);
            }
            
            // Do the same for removing icon
            let removeView = document.getElementById(`image_${i}_remove_icon`);
            if(removeView) {
                removeView.src = REMOVE_ICON;
            } else {
                console.log(`Image view ${i} its remove view icon element couldn't be found.`);
            }
        }
    }
    
    // --- Remove icon ---
    /**
     * Toggle show remove action icon by a given index
     * 
     * @param {number} index The element index
     */
    toggleShowRemoveAction(index) {
        // Do the same for removing icon
        let removeView = document.getElementById(`image_${index}_remove_icon`);
        if(removeView) {
            removeView.hidden = !removeView.hidden;
        } else {
            console.log(`Image view ${i} its remove view icon element couldn't be found.`);
        }
    }
    
    /**
     * Show remove action icon at a given index
     * 
     * @param {number} index The element index
     */
    showRemoveAction(index) {
        // Do the same for removing icon
        let removeView = document.getElementById(`image_${index}_remove_icon`);
        if(removeView) {
            removeView.hidden = false;
        } else {
            console.log(`Image view ${i} its remove view icon element couldn't be found.`);
        }
    }
    
    /**
     * Show remove action icon at a given index
     * 
     * @param {number} index The element index
     */
    hideRemoveAction(index) {
        // Do the same for removing icon
        let removeView = document.getElementById(`image_${index}_remove_icon`);
        if(removeView) {
            removeView.hidden = true;
        } else {
            console.log(`Image view ${i} its remove view icon element couldn't be found.`);
        }
    }
    
    // --- Operations ---
    /**
     * Update image views
     * 
     * Updates whether an img element is shown or not, and its src attribute.
     */
    updateImageViews() {
        let propLength = this.propertyImages.length;
        let index = 0;
        
        for(let imgView of this.imagesView) {
            // Update location and visibility
            if(propLength > 0 && index < propLength) {
                let srcLocation = `${location.origin}/${this.propertyImages[index]}`;
                imgView.src = srcLocation;
                imgView.hidden = false;
                
                this.showRemoveAction(index);
                
                index++;
            } else {
                imgView.hidden = true;
                
                this.hideRemoveAction(index);
            }
        }
    }
    
    /**
     * Update property images
     */
    updatePropertyImages() {
        // Fetch property images, if they exist
        let propertyImages = Promise.resolve(this.fetchAll());
        let thisClass = this;
        propertyImages.then((images) => {
            // console.log(`Response: `, images);
            thisClass.propertyImages = images;
            thisClass.previousImages = images;
            
            this.updateImageViews();
        });
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
                // Check whether something was added or removed
                if(imagesInput.files.length >= this.previousImagesInputLength) {
                    // Addition
                    
                    // Totally unnecessary, don't know why I did, but I leave it there just in case
                    // let res = await thisObject.preflightRequest(imagesInput.files);
                    
                    // Get form data from it
                    var formData = new FormData(document.getElementById("publish_image"));
                    
                    // Send images to server
                    await thisObject.instance.postForm(
                        `/set_image/${this.propertyId}`,
                        formData
                    );
                } else {
                    // Removal
                }
                
                // Update images view
                this.updatePropertyImages();
                
                // Update previous images input length
                this.previousImagesInputLength = imagesInput.files.length;
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
