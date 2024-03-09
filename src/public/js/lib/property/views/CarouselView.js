import ImagesAPI from "../images/ImagesAPI.js";
import PropertyImages from "../images/PropertyImages.js";

/**
 * Carousel view
 */
export default class CarouselView {
    current = 0;
    
    /**
     * Carousel view
     */
    constructor() {
        // Images container
        const imgsParent = document.getElementById("horizontalView");
        this.imagesParent = imgsParent;
        
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
        // Images will be updated only once
        this.propertyImages.setUpdatePropertyCallback(() => {
            console.log(`Images updated!`);
            
            // Create image views
            thisObj.createImageViews();
            
            // Others
            thisObj.setCarouselButtonImages();
            thisObj.setCarouselButtonActions();
        });
        
        // Get property images
        this.propertyImages.updatePropertyImages();
        
        // Fetch carousel before updating properties
        this.carousel = document.getElementById("carousel");
        if(!this.carousel) {
            console.warn("Carousel element not found!");
            console.warn("This will cause the view to not work properly!");
            console.warn("Please add a 'div' with the id of 'carousel'");
        }
    }
    
    /**
     * Create image views
     */
    createImageViews() {
        // Create image views
        const propertyImages = this.propertyImages.getAll();
        let index = 0;
        for(const imgLocation of propertyImages) {
            const imgEl = document.createElement("img");
            
            // Set image source
            const imgSource = `${location.origin}/${imgLocation}`;
            imgEl.src = imgSource;
            imgEl.id = `image_${index}`;
            
            // Insert into the carousel view
            this.imagesParent.appendChild(imgEl);
            
            index++;
        }
    }
    
    /**
     * Update image
     * 
     * After the user clicks to move to the next or previous image call this function to move the image
     */
    updateImage() {
        this.imagesParent.style = `transform: translateX(-${this.current * 100}%)`;
    }
    
    /**
     * Set carousel buttons image
     */
    setCarouselButtonImages() {
        const carouselLeftButtonImage = document.getElementById("carouselLeftButtonImage");
        const carouselRightButtonImage = document.getElementById("carouselRightButtonImage");
        
        if(carouselLeftButtonImage) {
            carouselLeftButtonImage.src = `${location.origin}/image/icons/arrow/black-solid/left-arrow.png`;
        }
        if(carouselRightButtonImage) {
            carouselRightButtonImage.src = `${location.origin}/image/icons/arrow/black-solid/right-arrow.png`;
        }
    }
    
    /**
     * Set carousel button actions
     */
    setCarouselButtonActions() {
        const carouselLeftButton = document.getElementById("carouselLeftButton");
        const carouselRightButton = document.getElementById("carouselRightButton");
        
        const images = this.propertyImages.getAll();
        const imagesLength = images.length;
        
        const thisObj = this;
        if(carouselLeftButton) {
            carouselLeftButton.addEventListener("click", (e) => {
                if(thisObj.current === 0) {
                    thisObj.current = imagesLength - 1;
                } else {
                    thisObj.current -= 1;
                }
                
                thisObj.updateImage();
            });
        }
        
        if(carouselRightButton) {
            carouselRightButton.addEventListener("click", (e) => {
                if(thisObj.current === imagesLength - 1) {
                    thisObj.current = 0;
                } else {
                    thisObj.current += 1;
                }
                
                thisObj.updateImage();
            });
        }
    }
}
