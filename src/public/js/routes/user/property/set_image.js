import axios from "axios";

const inputId = "images";

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
    console.log(`Sending preflight request`);
    console.log("Images: ", images);
    console.log(`Type: ${typeof(images)}`);
    
    // const imageNamesArray = images.map((image) => image.name);
    // console.log(`Images name array: `, imageNamesArray);
    
    let imagesArray = [];
    for(let image of images) {
        imagesArray.push({
            name: image.name,
            size: image.size,
        });
    }
    console.log(`Image names: `, imagesArray);
    
    const endpoint = "/user/property/images/add_image_preflight";
    const url = `${window.location.origin}${endpoint}`;
    console.log(`Url: ${url}`);
    
    // Create axios instance
    const instance = axios.create({
        baseURL: window.location.origin,
        timeout: 2000,
        headers: {'Content-Type': 'application/json'}
    });
    
    // Post data
    let res = await instance.post("/user/property/images/add_image_preflight", {
        images: imagesArray,
    }).then((res) => res)
        .catch((err) => {
            
            console.log("Error: ", err);
            return;
        });
    
    console.log(`Response status: `, res.status);
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

bindOnChange();
