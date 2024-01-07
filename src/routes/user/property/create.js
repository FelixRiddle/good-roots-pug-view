import express from "express";

import Property from "../../../models/Property.js";
import Price from "../../../models/Price.js";
import Category from "../../../models/Category.js";
import validatePropertyData from "../../../middleware/property/validatePropertyData.js";

import expand from "../../../controllers/expand.js";

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
        ...expand(req),
    });
});

// FIX: This has no validation???
createPropertyRouter.post(`/create`, validatePropertyData, async (req, res) => {
    // Insert on the database
    try {
        console.log(`Create property`);
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
        console.log(`Property: `, req.body.property);
        
        // Get user 'id' and rename it to 'userId'
        const { id: userId } = req.user;
        
        // Store data
        const property = await Property.create({
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
        let setImageUrl = `/user/property/set_image/${id}`;
        console.log(`Set image url: ${setImageUrl}`);
        return res.send({
            nextUrl: setImageUrl,
        });
    } catch(err) {
        console.log(`Error detected, the user will be redirected to properties`);
        console.error(err);
    }
    
    return res.redirect("user/admin");
});

export default createPropertyRouter;
