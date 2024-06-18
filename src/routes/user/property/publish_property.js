import express from "express";
import fs from "node:fs";

import userFolderMiddleware from "../../../middleware/user/userFolderMiddleware.js";
import { relativePropertyFolder } from "../../../lib/user/userFolder/property/propertyFolder.js";

const publishPropertyRouter = express.Router();

/**
 * Toggle publish would be a better name
 */
publishPropertyRouter.post("/publish_property/:id", userFolderMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`[POST] /user/property/publish_property/${id}`);
        
        const { Property } = req.models;
        
        // Validate that the property exists
        const property = await Property.findByPk(id);
        
        if(!property) {
            console.log(`Property doesn't exists!!!11`);
            return res.send({
                messages: [{
                    message: "Property doesn't exists.",
                    error: true,
                }]
            });
        }
        
        // Check if the property has images
        const propertyFolder = relativePropertyFolder(req.user.id, id);
        const files = fs.readdirSync(propertyFolder);
        if(files.length === 0) {
            console.log(`No images, bounce back.`);
            return res.send({
                messages: [{
                    message: "The property posseses no images.",
                    error: true,
                }]
            });
        }
        
        // Update property published value
        property.published = !property.published;
        await property.save();
        
        // Store
        await property.save();
        console.log(`Property updated, redirecting user`);
        
        // For now it's not important to communicate when the property is already published
        // You can't redirect the user nice
        return res.send({
            publishedStatus: property.published,
            messages: [{
                message: "Property published.",
                error: false,
            }]
        });
    } catch(err) {
        console.error(err);
        
        return res.send({
            messages: [{
                message: "Internal server error",
                error: true,
            }]
        });
    }
});

export default publishPropertyRouter;
