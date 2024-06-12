import express from "express";

import expand from "../../../controllers/expand.js";
import { serverUrl } from "../../../controllers/env/env.js";

const setImageRouter = express.Router();

// Set image
// I just remembered, id doesn't work here
// We have to remove the hyphens from it.
setImageRouter.get("/set_image/:id", async (req, res) => {
    try {
        console.log(`[GET] /user/property/set_image/${req.params.id}`);
        
        const { id } = req.params;
        const user = req.user;
        
        const Property = req.models.Property;
        
        // Validate that the property exists
        const propertyController = await Property.findByPk(id);
        
        if(!propertyController) {
            console.log(`The requested property doesn't exists!`);
            return res.redirect("user/property/admin");
        }
        
        // Remove sequelize stuff and leave just the data
        const property = propertyController.get({ plain: true });
        
        // Validate that the property belongs to the own who made the request
        if(user) {
            const userId = user.id.toString();
            const propertyUserId = property.userId.toString();
            if(userId !== propertyUserId) {
                console.log(`The user doesn't own this property going back...`);
                console.log(`User: `, user.name);
                return res.redirect("user/property/admin");
            }
        } else {
            console.log(`Req user doesn't exists`);
            return res.redirect("user/property/admin");
        }
        
        // Ok, render the page to set the image
        let nextUrl = `user/property/set_image`;
        
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
        
        const url = `${serverUrl()}/user/property/admin`;
        console.log(`Redirecting to ${url}`);
        
        return res.redirect(url);
    }
});

export default setImageRouter;
