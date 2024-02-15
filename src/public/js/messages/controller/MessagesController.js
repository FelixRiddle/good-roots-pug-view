import Message from "./Message.js";

/**
 * Status
 * 
 * 0) Success
 * 1) Warning
 * 2) Error
 * 3) Normal message
 */

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
     * @param {bool} error Whether it's an error or not
     */
    insertMessage(message, error) {
        const msg = new Message(message, error);
        msg.insertIntoHtml(this.elementId);
    }
}
