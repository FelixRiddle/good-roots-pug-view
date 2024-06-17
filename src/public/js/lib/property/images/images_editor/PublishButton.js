
/**
 * Publish button
 */
export default class PublishButton {
    constructor(imagesApi, propertImagesApi, buttonId = "publish") {
        this.button = document.getElementById(buttonId);
        this.imagesApi = imagesApi;
        this.propertyImagesApi = propertImagesApi;
    }
    
    /**
     * On publish property button click, send request to server to publish it
     */
    bindPublishProperty() {
        if(this.button) {
            const publishButton = this;
            this.button.addEventListener("click", async (e) => {
                e.preventDefault();
                
                // Make request
                await publishButton.imagesApi.setPropertyPublished(true);
                
                // Redirect to admin page
                location.href = `${location.origin}/user/property/admin`;
            });
            
            this.checkDisabled();
        } else {
            console.log(`Publish button not found!`);
        }
    }
    
    /**
     * Check disabled
     * 
     * If there's no image disable the button
     * Disabled is the opposite of whether there's an image or not
     */
    checkDisabled() {
        this.button.disabled = !this.propertyImagesApi.exists();
    }
}
