import express from "express";

import validatePropertyData from "../../../middleware/property/validatePropertyData.js";
import expand from "../../../controllers/expand.js";
import { serverUrl } from "../../../controllers/env/env.js";

const editRouter = express.Router();

editRouter.get("/edit/:id", async (req, res) => {
    const adminPanel = "user/property/admin";
    try {
        const { id } = req.params;
        
        const {
            Property,
            Price,
            Category
        } = req.models;
        
        // Check that property exists
        const propertyController = await Property.findByPk(id);
        const property = propertyController.get({plain:true});
        
        // Get price and category
        const [
            categories,
            prices,
        ] = await Promise.all([
            Category.findAll(),
            Price.findAll(),
        ]);
        
        if(!property) {
            console.log(`Property doesn't exists!`);
            return res.redirect(adminPanel);
        }
        
        // Check that person that accessed this url
        // is the person that owns this property
        if(property.userId.toString() !== req.user.id.toString()) {
            console.log(`The user is not the owner of the property!`);
            return res.redirect(adminPanel);
        }
        
        console.log(`Ok, rendering edit`);
        console.log(`Property: `, property);
        return res.render(
            `user/property/edit`, {
            page: `Edit property: ${property.title}`,
            categories,
            prices,
            property,
            ...expand(req),
        });
    } catch(err) {
        console.log(`Error: `, err);
        
        return res.render(
            adminPanel, {
            page: `Admin panel`,
            ...expand(req),
        });
    }
});

// For post, we have to validate the property data again
editRouter.post("/edit/:id", validatePropertyData, async (req, res) => {
    let url = serverUrl();
    console.log(`Server url ${url}`);
    
    try {
        const { id } = req.params;
        
        // Validation
        let newProperty = req.body.property;
        
        const Property = req.models.Property;
        
        // Check that property exists
        const property = await Property.findByPk(id);
        if(!property) {
            return res.send({
                messages: [{
                    message: "Couldn't update the property",
                    error: true,
                }],
                updated: false,
            });
        }
        
        // Check that the property owner is the user that made the request
        if(property.userId.toString() !== req.user.id.toString()) {
            return res.send({
                messages: [{
                    message: "Couldn't update the property",
                    error: true,
                }],
                updated: false,
            });
        }
        
        // Extract data
        const {
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            priceId,
            categoryId,
        } = newProperty;
        
        // Update property
        property.set({
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            priceId,
            categoryId,
        });
        await property.save();
        
        return res.send({
            messages: [{
                message: "Property updated",
                error: false,
            }],
            updated: true,
        });
    } catch(err) {
        console.log(err);
        
        return res.send({
            messages: [{
                message: "Couldn't update the property",
                error: true,
            }],
            updated: false,
        });
    }
});

export default editRouter;
