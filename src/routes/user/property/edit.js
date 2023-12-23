import express from "express";

import Price from "../../../models/Price.js";
import Category from "../../../models/Category.js";
import Property from "../../../models/Property.js";
import validatePropertyData from "../../../middleware/property/validatePropertyData.js";
import expand from "../../../controllers/expand.js";
import { serverUrl } from "../../../controllers/env/env.js";

const editRouter = express.Router();

editRouter.get("/edit/:id", async (req, res) => {
    const adminPanel = "user/property/admin";
    try {
        const { id } = req.params;
        
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
    const adminPanel = "user/property/admin";
    
    let url = serverUrl();
    console.log(`Server url ${url}`);
    
    try {
        // Validation
        let result = validationResult(req);
        
        const { id } = req.params;
        
        if(!result.isEmpty()) {
            // Get price and category
            const [
                categories,
                prices,
            ] = await Promise.all([
                Category.findAll(),
                Price.findAll(),
            ]);
            
            return res.render(
                `user/property/edit/${id}`, {
                page: `Edit property`,
                categories,
                prices,
                errors: result.array(),
                property: req.body,
            });
        }
        
        const property = await Property.findByPk(id);
        
        // Check that property exists
        if(!property) {
            return res.redirect(adminPanel);
        }
        
        // Check that the property owner is the user that made the request
        if(property.userId.toString() !== req.user.id.toString()) {
            return res.redirect(adminPanel)
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
        } = req.body;
        
        // TODO: Perform data validation
        
        
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
        
        return res.redirect(adminPanel);
    } catch(err) {
        console.log(err);
        
        return res.redirect(adminPanel);
    }
});

export default editRouter;
