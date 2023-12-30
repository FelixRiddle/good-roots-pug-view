import fs from "node:fs";
import express from "express";

import userFolderMiddleware from "../../../../middleware/user/userFolderMiddleware.js";
import propertyFolder from "../../../../lib/user/userFolder/property/propertyFolder.js";

const addImagePreflightRouter = express.Router();

// Preflight request, check if the given images exist
addImagePreflightRouter.post("/add_image_preflight/:id", userFolderMiddleware, (req, res) => {
    console.log(`Image preflight`);
    const { id } = req.params;
    const images = req.body.images;
    
    // Check if the image exists
    const propertyPath = propertyFolder(req.user.id, id);
    
    // Get images in the property folder
    const serverImages = fs.readdirSync(propertyPath);
    
    // Check collisions
    let collisions = [];
    let notCollided = [];
    for(let img of images) {
        // Image path
        const imageName = `${img.name}`;
        let collided = false;
        
        // Check for collisions
        innerFor: for(let srvImg of serverImages) {
            if(imageName === srvImg) {
                // Collision
                collided = true;
                
                break innerFor;
            }
        }
        
        // Check if it collided
        if(collided) {
            collisions.push(imageName);
        } else {
            notCollided.push(imageName);
        }
    }
    
    console.log(`Results`);
    console.log(`Collisions: `, collisions);
    console.log(`Not collided: `, notCollided);
    
    // Only proceed with the images that don't collide.
    return res.send({
        collisions,
        notCollided,
    });
});

export default addImagePreflightRouter;
