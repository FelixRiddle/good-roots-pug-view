/**
 * The result of a validation
 * 
 */
class ValidationResult {
    error = false;
    message = "";
    field = "";
    
    /**
     * Create object with the given data.
     *
     * @author: Felix
     */
    constructor() { }
    
    /**
     * This object is just using default values, therefore useless
     * 
     * @returns {bool}
     */
    isDefault() {
        if(!this.error && this.message.length === 0 && this.field.length === 0) {
            return true;
        }
        return false;
    }
    
    /**
     * Set this object as an error and give it a message
     * 
     * @param {string} field The field name for example 'email', 'password'
     * @param {string} message The field message for example 'Email not given'
     */
    setAsError(field, message) {
        this.error = true;
        this.field = field;
        this.message = message;
    }
    
    /**
     * Set this object as a success
     * 
     * @param {string} field The field name for example 'email', 'password'
     * @param {string} message The field message for example 'Email Ok'
     */
    setAsSuccess(field, message) {
        this.error = false;
        this.field = field;
        this.message = message;
    }
}

export default ValidationResult;
