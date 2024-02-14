/**
 * Message class
 */
export default class Message {
    message = "";
    error = false;
    element = undefined;
    
    /**
     * 
     * @param {string} message Message
     * @param {bool} error Whether it's an error or not
     */
    constructor(message, error, elementTag="li") {
        this.message = message;
        this.error = error;
        this.elementTag = elementTag;
    }
    
    /**
     * Create html element
     * 
     * It looks like this
     *  li
     *      span
     *          {message}
     *      span(hidden=true class="data")
     *          {data}
     * 
     * @returns {Element} The html element
     */
    createHtmlElement() {
        // Create new div element
        const messageElement = document.createElement(this.elementTag);
        
        // Create text container
        const textContainer = messageElement.createElement("span");
        const textNode = textContainer.createTextNode(this.message);
        
        // Data
        const dataContainer = messageElement.createElement("span");
        // Assign a data class to identify it
        dataContainer.classList.add("data");
        // Hide it
        dataContainer.hidden = true;
        
        messageElement.appendChild(textContainer);
        textContainer.appendChild(textNode);
        
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
        
        this.element = element;
        
        // Insert element
        element.appendChild(this.createHtmlElement());
    }
}
