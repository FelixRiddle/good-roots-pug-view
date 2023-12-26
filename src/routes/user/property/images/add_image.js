import express from "express";

import uploadProperty from "../../../../lib/user/userFolder/property/uploadPropertyMiddleware.js";

const addImageRouter = express.Router();

// Preflight request, check if the given images exist
addImageRouter.post("/add_image_preflight", (req, res) => {
    console.log(`Image preflight`);
    const { id } = req.params;
    console.log(`Request body: `, req.body);
    const images = req.body.images;
    console.log(`Images: `, images);
    
    // Check if the image exists
    const propertyPath = propertyFolder(req.user.email, id);
    // const imagePath = 
    
    let collisions = [];
    try {
        console.log(`The image exists`);
        fs.accessSync(propertyPath, constants.F_OK);
        
        collisions.push(propertyPath);
    } catch(err) {
        // The image doesn't exists
        console.log(`The image doesn't exists`);
    }
    
    // If there's at least one collision, don't proceed.
    if(collisions.length > 0) {
        return res.send({
            proceed: false,
            messages: [{
                message: "Collisions detected",
                error: true,
            }]
        });
    }
    
    // No collisions, send ok
    return res.send({
        proceed: true,
        messages: [{
            message: "No collisions",
            error: false,
        }]
    });
});

// Add an image to the property
addImageRouter.post("/add_image", uploadProperty.array("images"), (req, res) => {
    
});

export default addImageRouter;
