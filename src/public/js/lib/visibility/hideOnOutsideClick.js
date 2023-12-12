
/**
 * Hide an element when the user clicks outside of it, useful for 'pop-up navbars'
 * 
 * Reference/s:
 * https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
 * 
 * TODO: There's another answer down that question that's is better but takes more effort to implement,
 * that would be cool to do in the future but not now for me as I have no time.
 * The problem with this one, is for example it doesn't answer keyboard 'exit' events.
 * 
 * @param {HTMLElement} element 
 */
function hideOnOutsideClick(element) {
    const outsideClickListener = event => {
        // Checks to hide
        if(!element.contains(event.target) && isVisible(element)) {
            element.style.display = "none";
            removeClickListener();
        }
    }
    
    // Remove listeners
    const removeClickListener = () => {
        document.removeEventListener("click", outsideClickListener);
    }
    
    document.addEventListener("click", outsideClickListener);
}

const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

/**
 * Get and hide element on outside click
 * 
 * Gets the element by id
 * 
 * @param {string} elementId Element id to get and hide
 */
function getAndHideOnOutsideClick(elementId) {
    let element = document.getElementById(elementId);
    if(element) {
        hideOnOutsideClick(element);
    }
}

export {
    getAndHideOnOutsideClick,
    hideOnOutsideClick,
    isVisible,
}
