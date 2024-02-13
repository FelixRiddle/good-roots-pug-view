import Status from "../../../../status/Status.js";
import "../../../css/components/property/ImageEditor.scss";
import PropertyImagesUtils from "../../config/PropertyImagesUtils.js";
import propertyImagesConfiguration from "../../config/propertyImagesConfig.js";
import ImagesAPI from "./ImagesAPI.js";
import PropertyImages from "./PropertyImages.js";
import RemoveIcon from "./RemoveIcon.js";

/**
 * Image editor
 * 
 * API to communicate with the backend
 */
export default class ImageEditor {
    previousImagesInputLength = 0;
    imagesView = [];
    
    // Store previous quantity of images, this is to check
    // which are the images that exceed the limit of 10 images, and remove them.
    previousImages = [];
    
    // Class abstraction for remove icons
    removeImageIcons = [];
    
    // Collisions
    // Files that have collided with others in the backend will be set here
    collisions = [];
    
    /**
     * Create a new image editor
     * 
     * @param {string} inputId Input ID
     */
    constructor(inputId) {
        this.inputId = inputId;
        
        // Get property id
        const paths = window.location.pathname.split("/");
        const propertyId = paths[paths.length - 1];
        this.propertyId = propertyId;
        
        // Images API
        this.api = new ImagesAPI(propertyId);
        
        // Property images
        this.propertyImages = new PropertyImages(this.api);
        
        // Set it back to the api, wondering if this is ok?
        this.api.setPropertyImagesObject(this.propertyImages);
        
        // Set update callback
        const thisObj = this;
        this.propertyImages.setUpdatePropertyCallback(() => {
            thisObj.updateImageViews();
            console.log(`Images updated!`);
            
            // Update disabled
            const btn = document.getElementById("publish");
            btn.disabled = !this.propertyImages.exists();
        });
        
        // Trigger update
        this.propertyImages.updatePropertyImages();
        
        // Add image views
        this.startAddImageViews();
        
        // Publish property action
        this.bindPublishProperty();
    }
    
    // Start operations
    
    /**
     * On publish property button click, send request to server to publish it
     * 
     * Hmmm, this looks..., ABSTRACTABLE 😤😤
     */
    bindPublishProperty() {
        const btn = document.getElementById("publish");
        if(btn) {
            const thisObj = this;
            btn.addEventListener("click", async (e) => {
                e.preventDefault();
                
                // Make request
                await thisObj.api.setPropertyPublished(true);
                
                // Redirect to admin page
                location.href = `${location.origin}/user/property/admin`;
            });
            
            // Disabled is the opposite of whether there's an image or not
            btn.disabled = !this.propertyImages.exists();
        } else {
            console.log(`Publish button not found!`);
        }
    }
    
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
                // console.log(`Image view ${i} couldn't be found!`);
            }
            
            // Remove icon class abstraction
            let removeIconElementID = `image_${i}_remove_icon`;
            let removeIcon = new RemoveIcon(removeIconElementID);
            
            // Click cb
            const THIS = this;
            removeIcon.setClickCallback(async (e) => {
                // Remove image
                await THIS.api.removeImage(i);
                
                // Update images
                THIS.propertyImages.updatePropertyImages();
            });
            
            // Push to the list
            this.removeImageIcons.push(removeIcon);
        }
    }
    
    // --- Operations ---
    /**
     * Update image views
     * 
     * Updates whether an img element is shown or not, and its src attribute.
     */
    updateImageViews() {
        const propLength = this.propertyImages.propertyImages.length;
        let index = 0;
        
        for(let imgView of this.imagesView) {
            // Update location and visibility
            if(propLength > 0 && index < propLength) {
                let srcLocation = `${location.origin}/${this.propertyImages.at(index)}`;
                imgView.src = srcLocation;
                imgView.hidden = false;
                
                // Show remove action icon
                this.removeImageIcons[index].show();
                // this.showRemoveAction(index);
                
                index++;
            } else {
                imgView.hidden = true;
                
                // Show remove action icon
                this.removeImageIcons[index].hide();
                // this.hideRemoveAction(index);
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
                
                console.log(`Property images: `, thisObject.propertyImages.propertyImages);
                
                // Test
                console.log(`Image names: `, this.propertyImages.names());
                
                // I need to get the new files only
                
                // Remove files that don't fit the size configuration
                for(const image of imagesInput.files) {
                    const bytesSize = image.size;
                    const sizeInMB = (bytesSize / (1024*1024)).toFixed(2);
                    console.log(`Image: `, image);
                    
                    // Check that file sizes are below the maximum allowed
                    const maxSize = PropertyImagesUtils.maxFileSizeMB();
                    if(maxSize < sizeInMB) {
                        console.log(`Max size exceeded!`);
                        
                        // Create status message
                        const statusMsg = new Status("Max file size exceeded", true);
                        
                        // Insert into this element
                        statusMsg.insertIntoHtml("messageList");
                        
                        return;
                    }
                };
                
                // If the size is greater remove the images
                // TODO: This limit has to work on the backend too, and test it.
                // TODO: This limit has to work here on the frontend, and test it.
                if(imagesInput.files.length >= propertyImagesConfiguration.maxImages) {
                    // Get current images...
                    // Idk where the 'getImagesNameArray' method went, it seems it was deleted, my bad.
                    // let currentImages = thisObject.getImagesNameArray();
                    
                    return;
                }
                
                // TODO: Check that these are not the previous images
                // Check whether something was added or removed
                if(imagesInput.files.length >= this.previousImagesInputLength) {
                    // Addition
                    
                    // Totally unnecessary, don't know why I did, but I leave it there just in case
                    // let res = await thisObject.preflightRequest(imagesInput.files);
                    
                    // Get form data from it
                    var formData = new FormData(document.getElementById("publish_image"));
                    
                    // Send images to server
                    await thisObject.api.instance.postForm(
                        `/set_image/${this.propertyId}`,
                        formData
                    );
                    
                } else {
                    // Remove extra images
                }
                
                // Success
                this.onSuccessImagesChange(imagesInput);
            });
        } else {
            console.log(`The element with id 'images' couldn't be found!!!! 😡😡😡`);
        }
    }
    
    /**
     * When images change and it's successful, call this function
     * 
     * @param {HTMLInputElement} imagesInput Images input
     */
    onSuccessImagesChange(imagesInput) {
        // Update images view
        this.propertyImages.updatePropertyImages();
        
        // Update previous images input length
        this.previousImagesInputLength = imagesInput.files.length;
        
        // Store current images as previous images
        // This method doesn't exist anymore
        // this.previousImages = this.getImagesNameArray();
        
        // Remove images from the input
        // We will use the names to check which ones do exist
        imagesInput.value = [];
    }
}
