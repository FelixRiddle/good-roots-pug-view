/**
 * Switch status messages visibility
 * 
 * @param {string} elementId The element id
 */
function switchVisibility(elementId) {
    // Get status messages
    let statusMessages = document.getElementById(elementId);
    if(statusMessages) {
        // Show/Hide status messages
        statusMessages.hidden = !statusMessages.hidden;
    } else {
        console.log(`Error: Status messages element not found`);
    }
}

/**
 * Status messages handler
 * 
 * The 'open' also trigger close.
 * But 'close' could be more accessible, if it's a long list for example, 'close'
 * could be at the bottom.
 * 
 * @param {string} elementId The id of the element to close and open
 * @param {string} openButtonId The open button id
 * @param {string} closeButtonId The close button id
 */
function toggleVisibleOnClick(elementId, openButtonId, closeButtonId) {
    // Status messages button
    let statusMessagesButton = document.getElementById(openButtonId);
    if(statusMessagesButton) {
        // Hook up event
        statusMessagesButton.addEventListener("click", (e) => {
            switchVisibility(elementId);
        });
    }
    
    // Close button
    let closeButton = document.getElementById(closeButtonId);
    if(closeButton) {
        closeButton.addEventListener("click", (e) => {
            switchVisibility(elementId);
        });
    }
}

export {
    switchVisibility,
    toggleVisibleOnClick
}
