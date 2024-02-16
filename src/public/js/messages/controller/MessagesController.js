import Message from "./Message.js";

/**
 * Message controller
 * 
 * Follow the classic rule of, if you want a change that modifies a lot of behavior,
 * just create a new class.
 * 
 */
export default class MessageController {
    /**
     * 
     * @param {string} elementId The element id
     */
    constructor(elementId="messageList") {
        this.elementId = elementId;
    }
    
    /**
     * Fetch all messages
     */
    getMessages() {
        // Get element
        const el = document.getElementById(this.elementId);
        if(!el) {
            console.error("Couldn't find element");
            return;
        }
        
        for (const child of el.children) {
            console.log(child.tagName);
        }
        
        return el.children;
    }
    
    /**
     * Insert new message
     * 
     * @param {string} message Message
     * @param {Number} status Status
     */
    insertMessage(message, status) {
        const msg = new Message(message, status);
        msg.insertIntoHtml(this.elementId);
    }
}
