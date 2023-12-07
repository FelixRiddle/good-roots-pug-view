import express from "express";

import Property from "../../../models/Property.js";
import Price from "../../../models/Price.js";
import Category from "../../../models/Category.js";
import validatePropertyData from "../../../middleware/property/validatePropertyData.js";

const createPropertyRouter = express.Router();

// Routes
createPropertyRouter.get(`/create`, async (req, res) => {
    
    // Get price and category
    const [
        categories,
        prices,
    ] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
    ]);
    
    return res.render("user/property/create", {
        page: "Create property",
        categories,
        prices,
    });
});

createPropertyRouter.post(`/create`, validatePropertyData, async (req, res) => {
    // Insert on the database
    try {
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
        } = req.body.property;
        
        const { id: userId } = req.user;
        console.log(`Owner id: `, userId);
        
        // Store data
        const property = Property.create({
            // id(The uuid is generated automatically by the database)
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            image: "",
            published: false,
            userId,
            priceId,
            categoryId,
        });
        let id = property.id;
        
        console.log(`Success the user will be going to set the image`);
        return res.redirect(`/user/property/set-image/${id}`);
    } catch(err) {
        console.log(`Error detected, the user will be redirected to its profile`);
        console.error(err);
    }
    
    return res.render("/user/profile");
});

export default createPropertyRouter;
