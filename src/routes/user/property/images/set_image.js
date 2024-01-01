import express from "express";

import Property from "../../../../models/Property.js";
import uploadProperty from "../../../../lib/user/userFolder/property/uploadPropertyMiddleware.js";
import userFolderMiddleware from "../../../../middleware/user/userFolderMiddleware.js";
import { serverUrl } from "../../../../controllers/env/env.js";

const setImageRouter = express.Router();

setImageRouter.post("/set_image/:id", userFolderMiddleware, uploadProperty.array("images"), async (req, res) => {
    let url = `${serverUrl()}/user/property/admin`;
    console.log(`Set image endpoint`);
    
    try {
        // Check if there were even files given
        if(!req.files) {
            console.log(`Not even files were given!`);
            return res.send({
                messages: [{
                    message: "No images given for the property(1)",
                    error: true,
                }]
            });
        }
        
        // --- This should be in a middleware ---
        // The property and the user is already validated at the middleware
        const { id } = req.params;
        
        // It just is missing this part
        // Validate that the property exists
        const property = await Property.findByPk(id);
        // --------------------------------------
        
        // If not published update it to be
        if(!property.published) {
            console.log(`The property is not published, updating it to be.`);
            
            if(req.files.length === 0) {
                console.log(`No images given, bounce back.`);
                return res.send({
                    messages: [{
                        message: "No images given for the property(2)",
                        error: true,
                    }]
                });
            }
            
            // Name of the first image file
            property.image = req.files[0].filename;
            
            // Publish property
            property.published = 1;
            
            // Store
            await property.save();
        }
        
        console.log(`Redirecting user back to admin page`);
        // return res.redirect(url);
    } catch(err) {
        console.log(`Error: `);
        console.error(err);
        return res.redirect(url);
    }
});

export default setImageRouter;
