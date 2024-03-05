/**
 * If something changes in the future, just by changing the mapping everything will be ok
 * 
 * [Soften change]
 */
import {
    Category,
    DebugPropertyImageUpload,
    Price,
    Property,
    User,
} from "app-models";

/**
 * Activation function
 */
function DebugPropertyImageUploadModel() {
    return new DebugPropertyImageUpload();
}

/**
 * 
 */
function CategoryModel() {
    return new Category();
}

function PriceModel() {
    return new Price();
}

/**
 * If a model requires 'activation', get it from here
 */
function PropertyModel() {
    return new Property();
}

function UserModel() {
    return new User();
}

export {
    Category,
    CategoryModel,
    
    DebugPropertyImageUpload,
    DebugPropertyImageUploadModel,
    
    Price,
    PriceModel,
    
    Property,
    PropertyModel,
    
    User,
    UserModel,
};
