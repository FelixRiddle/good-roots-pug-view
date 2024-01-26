import ImagesAPI from "../ImagesAPI.js";
import PropertyImages from "../PropertyImages.js";

/**
 * Get all property images url
 * 
 * @param {number} propertyId Property id
 */
async function getAllPropertyImagesUrl(propertyId) {
    // Images API
    const api = new ImagesAPI(propertyId);
    
    // Property images
    const propertyImages = new PropertyImages(api);
    
    // Set it back to the api, wondering if this is ok?
    api.setPropertyImagesObject(propertyImages);
    
    // Get property images
    await propertyImages.updatePropertyImagesAsync();
    
    return propertyImages.getAllImagesUrl();
}

/**
 * Update property images
 * 
 * @param {Array} properties Array of properties
 * @returns {Array} Properties with the field 'images' that has a url pointing to the image.
 */
async function updatePropertyImages(properties) {
    // This could be faster, because promises are separated, and executed asynchronously, maybe?
    // const propertyImages = await Promise.all([
    //     ...properties.map(async (property) => await getAllPropertyImagesUrl(property.id))
    // ]);
    
    for(const property of properties) {
        property.images = await getAllPropertyImagesUrl(property.id);
    }
    
    return properties;
}

export {
    getAllPropertyImagesUrl,
    updatePropertyImages,
}
