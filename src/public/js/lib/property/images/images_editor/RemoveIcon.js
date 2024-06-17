const REMOVE_ICON = `${location.origin}/image/icons/cross/1/32.png`;

/**
 * Abstraction over remove icon
 * 
 * Remove icon is a feature of the image editor
 */
export default class RemoveIcon {
    /**
     * Remove icon constructor
     * 
     * @param {string} imgElementId Remove icon image element id
     */
    constructor(imgElementId) {
        const removeIconImg = document.getElementById(imgElementId);
        if(removeIconImg) {
            removeIconImg.src = REMOVE_ICON;
            this.removeIconImg = removeIconImg;
        }
    }
    
    /**
     * Set on click callback
     * 
     * @param {function} cb Callback
     */
    setClickCallback(cb) {
        // This usually happens IDK why
        if(this.removeIconImg) {
            this.removeIconImg.addEventListener("click", cb);
        }
    }
    
    // --- Visibiliy in the document ---
    /**
     * Toggle remove action icon visibility
     */
    toggleVisibility() {
        this.removeIconImg.hidden = !this.removeIconImg.hidden;
    }
    
    /**
     * Show remove action icon
     */
    show() {
        this.removeIconImg.hidden = false;
    }
    
    /**
     * Show remove action icon
     */
    hide() {
        this.removeIconImg.hidden = true;
    }
}
