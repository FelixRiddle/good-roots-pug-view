import axios from "axios";

async function setImageSource() {
    
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
            let propertyImages = property.imagesRelativeURI;
            
            // Check if there are images
            if(propertyImages.length == 0) {
                console.warn(`Property '${property.title}' has no images!`);
                continue;
            }
            
            // Get property image element
            let propertyElement = document.getElementById(`${property.id}_image`);
            if(propertyElement) {
                // Set image source location
                propertyElement.src = `${location.origin}/${propertyImages[0]}`
            }
        }
    }
}

setImageSource();
