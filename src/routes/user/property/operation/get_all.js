import express from "express";

import Property from "../../../../models/Property.js";
import Category from "../../../../models/Category.js";
import Price from "../../../../models/Price.js";
import { relativePropertyImages } from "../../../../lib/user/userFolder/property/propertyFolder.js";

const getAllRoutes = express.Router();

getAllRoutes.get(`/get_all`, async(req, res) => {
    const { id: userId } = req.user;
    console.log(`User ID: ${userId}`);
    
    // Fetch properties from the database that are owned by this user
    const propertiesRes = await Property.findAll({
        where: {
            userId,
        },
        include: [
            {
                raw: true,
                model: Category,
                as: 'category'
            }, {
                raw: true,
                model: Price,
                as: "price"
            }
        ]
    });
    
    // Thanks sensei for this incredible response
    // https://stackoverflow.com/questions/64546830/sequelize-how-to-eager-load-with-associations-raw-true
    const properties = propertiesRes.map(x => x.get({ plain: true }));
    
    // Get property images
    for(let property of properties) {
        // Get the property images relative to the public path
        let propertyImages = relativePropertyImages(userId, property.id);
        
        property.imagesRelativeURI = propertyImages;
        // console.log(`Property: `, property);
    }
    
    return res.send({
        properties,
    });
});

export default getAllRoutes;
