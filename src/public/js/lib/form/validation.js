import ValidationResult from "./validationResult"

/** Validate E-Mail
 * 
 * Validates length
 * Correctness
 * 
 * @param {string} email The email given
 * @param {string} fieldName Field name defaults to 'email' 
 * @returns {Circle} The new Circle object.
 */
let validateEmail = (email, fieldName = "email") => {
    
    // Check email length
    if(email.length >= 64) {
        return new ValidationResult()
            .setAsError(fieldName, "Email length can't exceed 64 characters");
    }
    if(email.length <= 4) {
        return new ValidationResult()
            .setAsError(fieldName, "Email length can't be less than 5 characters, shortest example a@b.c");
    }
    
    // Validate email with regex
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))) {
        return new ValidationResult()
            .setAsError(fieldName, "The email is invalid.");
    }
    
    return new ValidationResult()
        .setAsSuccess(fieldName, "Email is Ok");
}

export {
    validateEmail
}
