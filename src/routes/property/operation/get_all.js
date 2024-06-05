import express from "express";

import { relativePropertyImagesNorm } from "../../../lib/user/userFolder/property/propertyFolder.js";

const getAllRoutes = express.Router();

getAllRoutes.get("/get_all", async (req, res) => {
    try {
        const {
            Category,
            Price,
            Property
        } = req.models;
        
        const properties = await Property.findAll({
            where: {
                published: true,
            },
            include: [{
                raw: true,
                model: Price,
                as: "price"
            }, {
                raw: true,
                model: Category,
                as: "category"
            }]
        });
        
        // For each property
        // Get their images and add it to the field 'images'
        for(let property of properties) {
            const userId = property.userId;
            const propertyId = property.id;
            
            const propertyImages = relativePropertyImagesNorm(userId, propertyId);
            
            // It's a sequelize object, so insert it into data values
            property.dataValues.images = propertyImages;
        }
        
        return res.send({
            properties,
        });
    } catch(err) {
        console.error(err);
        return res.send({
            messages: [{
                message: "Unknown error",
                error: true,
            }]
        });
    }
});

export default getAllRoutes;
