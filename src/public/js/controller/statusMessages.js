
/**
 * Switch status messages visibility
 */
function switchVisibility() {
    // Get status messages
    let statusMessages = document.getElementById("statusMessages");
    if(statusMessages) {
        // Show/Hide status messages
        statusMessages.hidden = !statusMessages.hidden;
    } else {
        console.log(`Error: Status messages element not found`);
    }
}

/**
 * Status messages handler
 */
function handleStatusMessages() {
    // Status messages button
    let statusMessagesButton = document.getElementById("statusMessages:button");
    if(statusMessagesButton) {
        // Hook up event
        statusMessagesButton.addEventListener("click", (e) => {
            switchVisibility();
        });
    }
    
    // Close button
    let closeButton = document.getElementById("statusMessages:close");
    if(closeButton) {
        closeButton.addEventListener("click", (e) => {
            switchVisibility();
        });
    }
}

handleStatusMessages();
