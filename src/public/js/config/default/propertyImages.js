/**
 * Property images configuration
 * 
 */ 
const propertyImagesConfiguration = {
    maxImages: 10,
    minImages: 1,
    supportedTypes: [
        "jpg", "png", "jpeg"
    ],
    // Someone just can't export an image that weights too much
    // Flag that person as doing a little trolling
    maxSizeKb: 5120,
    // Someone just can't export an image that weights too little
    // Flag that person as doing a little trolling
    minSizeKb: 100,
};

export default propertyImagesConfiguration;
