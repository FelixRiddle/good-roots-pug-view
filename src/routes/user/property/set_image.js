import express from "express";

import Property from "../../../models/Property.js";
import expand from "../../../controllers/expand.js";
import userFolderMiddleware from "../../../middleware/user/userFolderMiddleware.js";
import { serverUrl } from "../../../controllers/env/env.js";
import uploadProperty from "../../../lib/user/userFolder/property/uploadPropertyMiddleware.js";

const setImageRouter = express.Router();

// Set image
// I just remembered, id doesn't work here
// We have to remove the hyphens from it.
setImageRouter.get("/set_image/:id", async (req, res) => {
    try {
        console.log(`At set_image`);
        
        const { id } = req.params;
        let user = req.user.dataValues;
        
        console.log(`Property id: ${id}`);
        
        // Validate that the property exists
        const propertyController = await Property.findByPk(id);
        
        if(!propertyController) {
            console.log(`The requested property doesn't exists!`);
            return res.redirect("user/property/admin");
        }
        console.log(`Property exists`);
        
        // Validate that the property belongs to the own who made the request
        if(user) {
            if(user.id.toString() !== propertyController.userId.toString()) {
                console.log(`The user doesn't own this property going back...`);
                console.log(`User: `, req.user.name);
                return res.redirect("user/property/admin");
            }
        } else {
            console.log(`Req user doesn't exists`);
            return res.redirect("user/property/admin");
        }
        console.log(`User owns property`)
        
        // Remove sequelize stuff and leave just the data
        let property = propertyController.get({ plain: true });
        
        // Ok, render the page to set the image
        let nextUrl = `user/property/set_image`;
        console.log(`All validations ok`);
        console.log(`Rendering: ${nextUrl}`);
        return res.render(
            nextUrl, {
            page: `Set images for ${property.title}`,
            property,
            ...expand(req),
        });
    } catch(err) {
        console.log(err);
        console.log(`Error: `, err);
        console.log(`Couldn't render /set_image`);
        return res.redirect("user/property/admin");
    }
});

setImageRouter.post("/set_image/:id", userFolderMiddleware, uploadProperty.array("images"), async (req, res) => {
    let url = `${serverUrl()}/user/property/admin`;
    
    try {
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
            
            console.log(`Files: `, req.files);
            if(req.files.length === 0) {
                console.log(`No images given, bounce back.`);
                return res.send({
                    messages: [{
                        message: "No images given for the property",
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
        return res.redirect("user/property/admin");
    } catch(err) {
        console.error(err);
        return res.redirect(url);
    }
});

export default setImageRouter;
