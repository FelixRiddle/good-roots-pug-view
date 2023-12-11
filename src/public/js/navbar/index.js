/**
 * Status messages handler
 */
function handleStatusMessages() {
    // Status messages button
    let statusMessagesButton = document.getElementById("statusMessages:button");
    if(statusMessagesButton) {
        // Hook up event
        statusMessagesButton.addEventListener("click", (e) => {
            // Get status messages
            let statusMessages = document.getElementById("statusMessages");
            
            // Show/Hide status messages
            statusMessages.hidden = !statusMessages.hidden;
        });
    }
}

handleStatusMessages();
