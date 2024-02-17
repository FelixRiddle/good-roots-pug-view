import PropertyImagesUtils from "../../../../config/PropertyImagesUtils.js";
import propertyImagesConfiguration from "../../../../config/propertyImagesConfig.js";
import MessageController from "../../../../messages/controller/MessagesController.js";
import ImagesAPI from "../../ImagesAPI.js";

// Executed at the start
const IMAGES_NOT_ZERO = 0;

// Executed in the middle
const REMOVE_HEAVY_IMAGES = 2;
// Images that are above the limit of max images
const REMOVE_EXTRA_IMAGES = 4;

// Executed at the end
const REMOVE_IMAGES_WHEN_FINISHED = 1;
const UPLOAD_IMAGES = 3;

/**
 * On images input change
 * 
 * Abstraction of things to do when the images input change
 * 
 * Behavior
 * * Order is forced internally
 * That is, if you added an action that should be executed at the end, regardless of
 * where you added it, it will be executed at the end.
 * 
 * Disordered images management
 * I've thought of a better way to do this
 * Enter [Ordered Images Management]
 * With this model the actions are put in the order that are given,
 * different from this one, in which the order is forced internally.
 * TODO: [Ordered Images Input Controller]
 */
export default class ImageInputChange {
    startRules = [];
    rules = [];
    endRules = [];
    
    stop = false;
    
    /**
     * 
     * @param {ImagesAPI} api 
     * @param {string} inputId Images input id
     */
    constructor(api, inputId) {
        const imagesInput = document.getElementById(inputId);
        if(!imagesInput) {
            throw Error("The image input element doesn't exists!");
        } else {
            console.log("Image input element found!");
        }
        this.api = api;
        this.imagesInput = imagesInput;
    }
    
    /**
     * The callback is awaited
     * 
     * @param {function} cb Callback
     */
    async enableWithCallback(cb) {
        const thisObj = this;
        this.imagesInput.addEventListener("change", async (event) => {
            console.log(`Image has changed!`);
            
            // Start rules
            if(thisObj.startRules.length > 0) {
                thisObj.onStart();
                
                // Some rules may want to stop the code from running
                if(thisObj.stop) {
                    console.log("(Start)Stopping code");
                    return;
                }
            }
            
            // Ruless
            if(thisObj.rules.length > 0) {
                thisObj.onMiddle();
                
                // Some rules may want to stop the code from running
                if(thisObj.stop) {
                    console.log("(Middle)Stopping code");
                    return;
                }
            }
            
            // End rules
            if(thisObj.rules.length > 0) {
                await thisObj.onFinish();
                
                // Some rules may want to stop the code from running
                if(thisObj.stop) {
                    console.log("(End)Stopping code");
                    return;
                }
            }
            
            await cb();
        });
    }
    
    /**
     * Functions at the start
     */
    onStart() {
        for(let rule of this.startRules) {
            switch(rule) {
                case IMAGES_NOT_ZERO: {
                    console.log("Images not zero");
                    // Remove images from the input
                    this.imagesNotZeroFn();
                    break;
                }
            };
            
            // Some rules may want to stop the code from running
            if(this.stop) {
                break;
            }
        }
    }
    
    /**
     * Middle functions
     */
    onMiddle() {
        for(let rule of this.rules) {
            switch(rule) {
                case REMOVE_HEAVY_IMAGES: {
                    console.log("Remove heavy images");
                    // Remove images from the input
                    this.removeHeavyImagesFn();
                    break;
                }
            }
        }
    }
    
    /**
     * Functions at the end
     */
    async onFinish() {
        // Latest of all
        let removeImages = false;
        
        // Execute every rule
        for(let rule of this.endRules) {
            switch(rule) {
                case UPLOAD_IMAGES: {
                    console.log("Upload images");
                    await this.uploadImagesFn();
                    break;
                }
                case REMOVE_IMAGES_WHEN_FINISHED: {
                    removeImages = true;
                    break;
                }
            }
        }
        
        // At the end
        if(removeImages) {
            console.log("Remove images when finished");
            // Remove images from the input
            this.removeImagesWhenFinishedFn();
        }
    }
    
    // --- Rules functions ---
    imagesNotZeroFn() {
        // Check that there are files
        const files = this.imagesInput.files;
        console.log(`Images: `, files.length);
        if(files.length === 0) {
            console.log("No images, stop");
            
            this.stop = true;
        }
    }
    
    /**
     * Upload images
     */
    async uploadImagesFn() {
        // Get form data from it
        let formData = new FormData(document.getElementById("publish_image"));
        
        // Send images to server
        await this.api.instance.postForm(
            `/set_image/${this.propertyId}`,
            formData
        );
        console.log("Image uploaded");
    }
    
    removeExtraImagesFn() {
        // If the size is greater remove the images
        // TODO: This limit has to work on the backend too, and test it.
        // TODO: This limit has to work here on the frontend, and test it.
        if(this.imagesInput.files.length >= propertyImagesConfiguration.maxImages) {
            // Get current images...
            // Idk where the 'getImagesNameArray' method went, it seems it was deleted, my bad.
            // let currentImages = thisObject.getImagesNameArray();
            
            this.stop = true;
        }
    }
    
    /**
     * Remove heavy images
     * 
     * @returns {}
     */
    removeHeavyImagesFn() {
        // Remove files that don't fit the size configuration
        for(const image of this.imagesInput.files) {
            // Get image size
            const bytesSize = image.size;
            const sizeInMB = (bytesSize / (1024*1024)).toFixed(2);
            console.log(`Image: `, image);
            
            // Check that file sizes are below the maximum allowed
            const maxSize = PropertyImagesUtils.maxFileSizeMB();
            if(maxSize < sizeInMB) {
                console.log(`Max size exceeded!`);
                
                // Create message
                const msgCtrl = new MessageController();
                msgCtrl.insertMessage(`Max file size exceeded, file name of the heavy file: ${this.image.name}`, 4);
                
                // Stop code
                this.stop = true;
            }
        }
    }
    
    removeImagesWhenFinishedFn() {
        // Remove images from the input
        // We will use the names to check which ones do exist
        this.imagesInput.value = [];
    }
    
    // --- Enable rules ---
    /**
     * Check that images length is not zero
     */
    imagesNotZero() {
        this.startRules.push(IMAGES_NOT_ZERO);
    }
    
    uploadImages() {
        this.endRules.push(UPLOAD_IMAGES);
    }
    
    removeExtraImages() {
        this.rules.push(REMOVE_EXTRA_IMAGES);
    }
    
    removeHeavyImages() {
        this.rules.push(REMOVE_HEAVY_IMAGES);
    }
    
    removeImagesWhenFinished() {
        this.endRules.push(REMOVE_IMAGES_WHEN_FINISHED);
    }
}
