import express from "express";

import Price from "../../../models/Price.js";
import Category from "../../../models/Category.js";
import Property from "../../../models/Property.js";
import validatePropertyData from "../../../middleware/property/validatePropertyData.js";

const editRouter = express.Router();

editRouter.get("/edit:id", async (req, res) => {
    console.log(`Entered edit mode`);
    console.log("Body: ", req.body);
    
    const { id } = req.params;
    
    // Check that property exists
    const property = Property.findByPk(id);
    
    // Get price and category
    const [
        categories,
        prices,
    ] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
    ]);
    
    try {
        if(!property) {
            return res.redirect("/admin");
        }
        
        // Check that person that accessed this url
        // is the person that owns this property
        if(property.userId.toString() !== req.user.id.toString()) {
            return res.redirect("/admin");
        }
        
        return res.render(
            "user/property/edit", {
            page: `Edit property: ${property.title}`,
            categories,
            prices,
            property: req.body,
        });
    } catch(err) {
        console.log(err);
        
        return res.render(
            "user/property/edit", {
            page: `Edit property: ${property.title}`,
            categories,
            prices,
            property: req.body,
        });
    }
});

// For post, we have to validate the property data again
editRouter.post("/edit:id", validatePropertyData, async (req, res) => {
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
                `user/property/edit:${id}`, {
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
            return res.redirect("/admin");
        }
        
        // Check that the property owner is the user that made the request
        if(property.userId.toString() !== req.user.id.toString()) {
            return res.redirect("/admin")
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
        
        return res.redirect("/admin");
    } catch(err) {
        console.log(err);
        
        return res.redirect("/admin");
    }
});

export default editRouter;
