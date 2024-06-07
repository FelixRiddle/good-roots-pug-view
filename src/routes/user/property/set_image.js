import express from "express";

import expand from "../../../controllers/expand.js";

const setImageRouter = express.Router();

// Set image
// I just remembered, id doesn't work here
// We have to remove the hyphens from it.
setImageRouter.get("/set_image/:id", async (req, res) => {
    try {
        console.log(`[GET] /user/property/set_image/${req.params.id}`);
        
        const { id } = req.params;
        const user = req.user;
        
        console.log(`User: `, req.user);
        console.log(`Property id: ${id}`);
        
        const Property = req.models.Property;
        
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
                console.log(`User: `, user.name);
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

export default setImageRouter;
