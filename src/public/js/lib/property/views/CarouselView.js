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
        } else {
            // Add overflow hidden to it
            this.carousel.classList.add("overflow-hidden");
            this.carousel.classList.add("relative");
        }
        
        // Get property images
        console.log(`Updating images`);
        this.propertyImages.updatePropertyImages();
    }
    
    /**
     * Create image views
     */
    createImageViews() {
        
        // Add images parent, to make them be horizontal
        const imgsParent = document.createElement("div");
        this.imgsParent = imgsParent;
        imgsParent.classList.add("flex");
        imgsParent.classList.add("overflow-hidden");
        imgsParent.id = "horizontalView";
        this.carousel.appendChild(imgsParent);
        
        // Create image views
        const propertyImages = this.propertyImages.getAll();
        let index = 0;
        for(const imgLocation of propertyImages) {
            const imgEl = document.createElement("img");
            
            // Set image source
            const imgSource = `${location.origin}/${imgLocation}`;
            imgEl.src = imgSource;
            imgEl.id = `image_${index}`;
            
            // Don't hide the first image, hide the rest
            const isFirstImage = index === 0;
            if(!isFirstImage) {
                // imgEl.style = "display: none;";
            }
            
            console.log(`Image source: `, imgSource);
            
            // Insert into the carousel view
            imgsParent.appendChild(imgEl);
            
            index++;
        }
    }
}