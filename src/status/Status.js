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
}
