/**
 * Root location
 * 
 * @returns {string} Returns the root location of the app
 */
function rootLocation() {
    return location.protocol + "//" + location.host;
}

let root = rootLocation();

export default rootLocation;
