import axios from "axios";

const inputId = "images";
    
// Create axios instance
const instance = axios.create({
    baseURL: window.location.origin,
    timeout: 2000,
    headers: {'Content-Type': 'application/json'}
});

const propertyImagesEndpoint = "/user/property/images";
const paths = window.location.pathname.split("/");
const propertyId = paths[paths.length - 1];

/**
 * Send preflight request to server about the images
 * 
 * @param {Array} images Array of image files
 */
async function preflightRequest(images) {
    if(!images) {
        console.log("Can't send preflight request if there are no images!! 🤬🤬🤬🤬");
        return;
    }
    
    let imagesArray = [];
    for(let image of images) {
        imagesArray.push({
            name: image.name,
            size: image.size,
        });
    }
    
    const endpoint = `${propertyImagesEndpoint}/add_image_preflight`;
    // const url = `${window.location.origin}${endpoint}`;
    
    // Post data
    let res = await instance.post(`${endpoint}/${propertyId}`, {
        images: imagesArray,
    }).then((res) => res)
        .catch((err) => {
            
            console.log("Error: ", err);
            return;
        });
    
    console.log(`Response status: `, res.status);
    console.log(`Response data: `, res.data);
}

/**
 * On change send request to the server to check whether the file is ready to be
 * uploaded or it collides with another image
 */
function bindOnChange() {
    const imagesInput = document.getElementById(inputId);
    if(imagesInput) {
        imagesInput.addEventListener("change", async (e) => {
            console.log("Images changed");
            
            // Files
            console.log("Selected files: ", imagesInput.files);
            console.log("File: ", imagesInput.value);
            
            await preflightRequest(imagesInput.files);
        });
    } else {
        console.log(`The element with id 'images' couldn't be found!!!! 😡😡😡`);
    }
}

/**
 * When the page loads fetch all images
 */
async function fetchAll() {
    let res = await instance.get(`${propertyImagesEndpoint}/get_all/${propertyId}`)
        .then((res) => {
            return res;
        }).catch((err) => {
            console.log(`Error when fetching image names from the backend: `, err);
        });
    
    return res.data.images;
}

bindOnChange();

// I love doing this one haha
(async () => {
    let images = await fetchAll();
    
    console.log(`Property images: `, images);
})();
