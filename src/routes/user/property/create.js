import express from "express";

import validatePropertyData from "../../../middleware/property/validatePropertyData.js";
import expand from "../../../controllers/expand.js";

const createPropertyRouter = express.Router();

// Routes
createPropertyRouter.get(`/create`, async (req, res) => {
    try {
        const {
            Category,
            Price,
        } = req.models;
        
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
    } catch(err) {
        console.error(err);
    }
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
        
        const {
            Property,
        } = req.models;
        
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
        
        let setImageUrl = `/user/property/set_image/${id}`;
        return res.send({
            propertyCreated: true,
            nextUrl: setImageUrl,
        });
    } catch(err) {
        console.log(`Error detected, the user will be redirected to properties`);
        console.error(err);
        return res.send({
            propertyCreated: false,
        });
    }
});

export default createPropertyRouter;
