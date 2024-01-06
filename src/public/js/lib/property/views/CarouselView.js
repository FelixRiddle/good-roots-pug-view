import ImagesAPI from "../ImagesAPI.js";
import PropertyImages from "../PropertyImages.js";

/**
 * Carousel view
 */
export default class CarouselView {
    
    /**
     * Carousel view
     */
    constructor() {
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
            console.log(`Images updated!`);
            
            // Create image views
            thisObj.createImageViews();
        });
        
        // Fetch carousel before updating properties
        this.carousel = document.getElementById("carousel");
        if(!this.carousel) {
            console.warn("Carousel element not found!");
            console.warn("This will cause the view to not work properly!");
            console.warn("Please add a 'div' with the id of 'carousel'");
        }
        
        // Get property images
        console.log(`Updating images`);
        this.propertyImages.updatePropertyImages();
        
        // Others
        this.setCarouselButtonImages();
    }
    
    /**
     * Create image views
     */
    createImageViews() {
        const imgsParent = document.getElementById("horizontalView");
        
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
            imgsParent.appendChild(imgEl);
            
            index++;
        }
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
}