/**
 * If something changes in the future, just by changing the mapping everything will be ok
 */
import {
    DebugPropertyImageUpload,
    Property
} from "app-models";

/**
 * If a model requires 'activation', get it from here
 */
function PropertyModel() {
    return new Property();
}

/**
 * Activation function
 */
function DebugPropertyImageUploadModel() {
    return new DebugPropertyImageUpload();
}

export {
    DebugPropertyImageUpload,
    DebugPropertyImageUploadModel,
    
    Property,
    PropertyModel,
};
