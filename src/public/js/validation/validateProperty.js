import { Validator } from "felixriddle.checkpoint";

/**
 * Validates a property object
 * 
 * @param {Object} property The property to validate
 * @returns {Array} Array of errors
 */
function validateProperty(property) {
    let idBasedScope = "id_based";
    let coordinateScope = "coordinate_scope";
    let val = new Validator()
        // Title scope    
        .createScope("title", "title", property.title)
            .isNotFalsy()
            .lengthRange(3, 128)
        // Description scope
        .createScope("description", "description", property.description)
            .isNotFalsy()
            .lengthRange(10, 512)
        // Categories and price
        .createScope(idBasedScope, "categoryId", property.categoryId)
            .isNotFalsy()
            .isInt()
            .numRange(0, 7)
        .useScope(idBasedScope, "priceId", property.priceId)
            .isInt()
            .numRange(0, 10)
        // Others
        .useScope(idBasedScope, "rooms", property.rooms)
            .isInt()
            .numRange(0, 9)
        .useScope(idBasedScope, "parking", property.parking)
            .isInt()
            .numRange(0, 4)
        .useScope(idBasedScope, "bathrooms", property.bathrooms)
            .isInt()
            .numRange(0, 4)
        .createScope(coordinateScope, "latitude", property.latitude)
            .isNotFalsy()
            .isFloat()
        .useScope(coordinateScope, "longitude", property.longitude)
            .isNotFalsy()
            .isFloat()
        .createScope("street", "street", property.street)
            .isNotFalsy();
    
    // Check that validation passes
    let result = val.validate();
    if(result.length > 0) {
        return result;
    }
    
    return [];
}

export default validateProperty;
