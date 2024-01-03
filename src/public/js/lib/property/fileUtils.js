
/**
 * Get images name
 * 
 * @param {string} inputId The input id
 * @returns {Array}
 */
function elementFileNames(inputId) {
    const imagesInput = document.getElementById(inputId);
    
    let imagesName = [];
    for(let image of imagesInput.files) {
        console.log("Pushing: ", image.name);
        imagesName.push(image.name);
    }
    
    return imagesName;
}

export {
    elementFileNames
}
