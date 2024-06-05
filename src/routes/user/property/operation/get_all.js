import express from "express";
import fs from "node:fs";

import { relativePropertyFolder, relativePropertyImages } from "../../../../lib/user/userFolder/property/propertyFolder.js";
import userFolder from "../../../../lib/user/userFolder/userFolder.js";

const getAllRoutes = express.Router();

getAllRoutes.get(`/get_all`, async(req, res) => {
    try {
        const { id: userId } = req.user;
        console.log(`User ID: ${userId}`);
        
        const {
            Category,
            Price,
            Property,
        } = req.models;
        
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
        
        // Add property images
        // IF there are no properties this crashes
        try {
            // Get property images
            for(let property of properties) {
                // Get the property images relative to the public path
                let propertyImages = relativePropertyImages(userId, property.id);
                
                property.imagesRelativeURI = propertyImages;
                // console.log(`Property: `, property);
            }
        } catch(err) {
            // No properties(or no property images)
            
            // Try creating them
            try {
                userFolder(userId.toString());
                
                // Create properties folder
                for(let property of properties) {
                    // Get property path
                    let propPath = relativePropertyFolder(userId.toString(), property.id);
                    
                    // Check if file exists
                    try {
                        fs.accessSync(propPath, fs.constants.R_OK);
                        // console.log(`Property folder does exist!`);
                    } catch(err) {
                        // console.log(`Folder for ${propPath} doesn't exists, creating it...`);
                        fs.mkdirSync(propPath);
                    }
                }
            } catch(err) {
                // console.log(`Error when creating user folder?: `, err);
            }
        }
        
        return res.send({
            properties,
        });
    } catch(err) {
        console.error(err);
        return res.send({
            properties: []
        });
    }
});

export default getAllRoutes;
