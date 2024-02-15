// import MessageController from "../../../messages/controller/MessagesController.js";
import MessageController from "../../../messages/controller/MessagesController.js";

const msgCtrl = new MessageController();

/**
 * Get form data
 * 
 * @returns {object} Data Object 
 */
function getFormData() {
    const data = {};
    
    const message = document.getElementById("msgDesc");
    data.message = message.value;
    
    const isErrorCheckbox = document.getElementById("msgError");
    data.error = isErrorCheckbox.checked;
    
    return data;
}

/**
 * Create message
 * 
 */
function createMessage() {
    const data = getFormData();
    console.log(`Message data: `, data);
    
    // Insert message
    msgCtrl.insertMessage(data.message, data.error);
}

// Hook up button callback
const createBtn = document.getElementById("msgCreate");
if(createBtn) {
    console.log(`Create button found!`);
    createBtn.onclick = ((e) => {
        console.log(`Button clicked, creating message`);
        
        createMessage();
    });
} else {
    console.log(`Create button not found!`);
}
