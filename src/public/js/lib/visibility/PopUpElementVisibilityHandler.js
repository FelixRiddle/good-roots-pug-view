import { hideOnOutsideClick } from "./hideOnOutsideClick.js";

/**
 * Handles the visibility of a 'pop-up element'
 * 
 * Toggles open when the open element is clicked, if open is clicked again the navbar is closed
 * Same for close.
 * 
 * And it also handles click outside of it, which would trigger a close.
 */
export default class PopUpElementVisibilityHandler {
    visibilityEnabledTime = undefined
    
    /**
     * 
     * 
     * @param {string} elementId The id of the element to close and open
     * @param {string} openElementId The open button id
     * @param {string} closeElementId The close button id
     */
    constructor(elementId, openElementId, closeElementId) {
        // Element to show / hide
        this.elementId = elementId;
        this.element = document.getElementById(elementId);
        if(!this.element) {
            console.log(`Error in NavbarVisibilityHandler: Couldn't fetch the navbar by id`);
        }
        
        // Element that triggers open
        this.openElement = document.getElementById(openElementId);
        if(!this.openElement) {
            console.log(`Error in NavbarVisibilityHandler: Couldn't fetch the open element by id`);
        }
        
        // Element that triggers close
        this.closeElement = document.getElementById(closeElementId);
        if(!this.closeElement) {
            console.log(`Error in NavbarVisibilityHandler: Couldn't fetch the close element by id`);
        }
        
        this.bindToggleVisibleOnClick();
    }
    
    /**
     * Switch visibility
     */
    switchVisibility() {
        if(this.element) {
            // Show/Hide element
            this.element.hidden = !this.element.hidden;
        } else {
            console.log(`Error: Pop up element not found`);
        }
    }
    
    /**
     * Bind toggle visible on click
     * 
     */
    bindToggleVisibleOnClick() {
        // Callbacks
        const outsideClickListener = event => {
            // The same event that enables this function to run is also triggered again.
            if(this.visibilityEnabledTime == event.timeStamp) {
                return;
            }
            
            // Checks to hide
            if(!this.element.contains(event.target) && !this.element.hidden) {
                this.element.hidden = !this.element.hidden;
                
                removeClickListener();
            }
        }
            
        // Remove listeners
        const removeClickListener = () => {
            document.removeEventListener("click", outsideClickListener);
                
            this.visibilityEnabledTime = undefined;
        }
        
        // Bindings
        if(this.openElement) {
            // Hook up event
            this.openElement.addEventListener("click", (e) => {
                // As soon as you add the event to the document, it's fired for this very click
                // and we don't want that for this to work.
                // Otherwise, it hides immediately, and you will never see the element.
                // Simple fix by checking it's timestamp
                if(!this.visibilityEnabledTime) {
                    this.visibilityEnabledTime = e.timeStamp;
                }
                
                // Bind outside click listener
                // It must be binded before the switch
                document.addEventListener("click", outsideClickListener);
                
                this.switchVisibility();
            });
        }
        
        // Close button
        if(this.closeElement) {
            this.closeElement.addEventListener("click", (e) => {
                this.switchVisibility();
                
                removeClickListener();
            });
        }
    }
}
