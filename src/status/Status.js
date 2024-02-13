/**
 * Status class
 */
export default class Status {
    message = "";
    error = false;
    
    /**
     * 
     * @param {string} message Message
     * @param {bool} error Whether it's an error or not
     */
    constructor(message, error) {
        this.message = message;
        this.error = error;
    }
    
    /**
     * Create html element
     * 
     * @returns {Element} The html element
     */
    createHtmlElement() {
        // Create new div element
        const statusElement = document.createElement("div");
        
        const textNode = document.createTextNode(this.message);
        
        statusElement.appendChild(textNode);
        
        return statusElement;
    }
    
    /**
     * Create li html element
     * 
     * For lists
     * 
     * @returns {Element} The html element
     */
    createLiHtmlElement() {
        // Create new div element
        const statusElement = document.createElement("li");
        
        const textNode = document.createTextNode(this.message);
        
        statusElement.appendChild(textNode);
        
        return statusElement;
    }
    
    /**
     * Create as an html element and insert into a given element
     */
    insertIntoHtml(elementId) {
        const element = document.getElementById(elementId);
        
        if(!element) {
            console.error("Couldn't create element");
            return;
        }
        
        // Insert element
        element.appendChild(this.createHtmlElement());
    }
}
