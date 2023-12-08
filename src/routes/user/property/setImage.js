import express from "express";

import Property from "../../../models/Property.js";
import upload from "../../../middleware/updloadImage.js";

const setImageRouter = express.Router();

// Set image
// I just remembered, id doesn't work here
// We have to remove the hyphens from it.
setImageRouter.get("/set-image/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Get set-image with id: ${id}`);
        console.log(`Body: `, req.body);
        console.log(`Id: ${id}`);
        console.log(`Params: `, req.params);
        console.log(`User: `, req.user);
        
        let user = req.user.dataValues;
        console.log(`User: `, user);
        
        // Validate that the property exists
        const property = await Property.findByPk(id);
        
        if(!property) {
            console.log(`The requested property doesn't exists!`);
            return res.redirect("/user/property/admin");
        }
        
        // Validate that the property is not published
        if(property.published) {
            console.log(`This property has already been published`);
            return res.redirect("/user/property/admin");
        }
        
        // Validate that the property belongs to the own who made the request
        if(user) {
            console.log(`User id: `, user.id);
            console.log(`Type: `, typeof(user.id));
            console.log(`Property owner id: ${property.ownerId}`)
            
            if(user.id.toString() !== property.ownerId.toString()) {
                console.log(`The user doesn't own this property going back...`);
                console.log(`User: `, req.user.name);
                return res.redirect("/user/property/admin");
            }
        } else {
            console.log(`Req user doesn't exists`);
            return res.redirect("/user/property/admin");
        }
        
        return res.render(`user/property/set-image`, {
            page: `Set images for ${property.title}`,
            property
        });
    } catch(err) {
        console.log(err);
        return res.redirect("/user/property/admin");
    }
});

setImageRouter.post("/set-image/:id", upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Inserting the image on the server with id(property): ${id}`);
        
        // Validate that the property exists
        const property = await Property.findByPk(id);
        
        if(!property) {
            return res.redirect("/user/property/admin");
        }
        
        // Validate that the property is not published
        if(property.published) {
            return res.redirect("/user/property/admin");
        }
        
        // Validate that the property belongs to the own who made the request
        if(req.user) {
            if(req.user.id.to_string() !== property.ownerId.to_string()) {
                return res.redirect("/user/property/admin");
            }
        } else {
            console.log(`Req user doesn't exists`);
            return res.redirect("/user/property/admin");
        }
        
        // Store image
        property.image = req.file.filename;
        
        // Publish property
        property.published = 1;
        
        // Store
        await property.save();
        
        next();
    } catch(err) {
        console.error(err);
        return res.redirect("/user/property/admin");
    }
});

export default setImageRouter;
