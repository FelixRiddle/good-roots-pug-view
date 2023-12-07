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
            .numRange(0, 20)
        // Others
        .useScope(idBasedScope, "priceId", property.priceId)
        .useScope(idBasedScope, "rooms", property.rooms)
        .useScope(idBasedScope, "parking", property.parking)
        .useScope(idBasedScope, "bathrooms", property.bathrooms)
        .createScope(coordinateScope, "latitude", property.latitude)
            .isNotFalsy()
            .isFloat()
        .useScope(coordinateScope, "longitude", property.longitude)
        .createScope("street", "street", property.street)
            .isNotFalsy();
    
    // Check that validation passes
    let result = val.validate();
    if(result.length > 0) {
        console.log(`Errors: `, result);
        return result;
    }
    
    return [];
}

export default validateProperty;
