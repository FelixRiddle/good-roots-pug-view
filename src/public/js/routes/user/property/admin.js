import axios from "axios";

// Create axios instance
const instance = axios.create({
    baseURL: `${window.origin}/user/property`,
    timeout: 2000,
    headers: {'Content-Type': 'application/json'}
});

/**
 * Bind delete property
 * 
 * @param {number} propertyId Property id
 */
function bindDeleteProperty(propertyId) {
    // Get property image element
    const deleteButton = document.getElementById(`deleteProperty_${propertyId}`);
    if(deleteButton) {
        // Add event on click
        deleteButton.addEventListener("click", async (e) => {
            // Post to it
            await instance.post(`/delete/${propertyId}`);
            console.log(`Property ${propertyId} deleted`);
        });
    }
}

/**
 * Update property
 * 
 * Is called for each property
 * 
 * @param {*} property A property
 */
function updateProperty(property) {
    let propertyImages = property.imagesRelativeURI;
    
    // Bind the delete button of property to send a request to delete it
    bindDeleteProperty(property.id);
    
    // Check if there are images
    if(propertyImages.length == 0) {
        console.warn(`Property '${property.title}' has no images!`);
        return;
    }
    
    // Get property image element
    let propertyElement = document.getElementById(`${property.id}_image`);
    if(propertyElement) {
        // Set image source location
        propertyElement.src = `${location.origin}/${propertyImages[0]}`
    }
}

/**
 * Set image source
 */
async function setImageSource() {
    // Fetch every property
    let data = await axios({
        method: 'get',
        url: `${location.origin}/user/property/operation/get_all`,
    })
        .then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(`Error: `, err);
            return;
        });
    
    if(data) {
        let properties = data.properties;
        
        // Update images source
        for(let property of properties) {
            updateProperty(property);
        }
    }
}

setImageSource();
