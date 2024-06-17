import express from "express";
import PropertyFolder from "../../../user/userFolder/property/PropertyFolder.js";

const getAllRouter = express.Router();

// Add an image to the property
getAllRouter.get("/get_all/:id", async (req, res) => {
    try {
        const { id: propertyId } = req.params;
        
        console.log(`[GET] /property/images/get_all/${propertyId}`);
        
        // Validate the property is published
        const {
            Property
        } = req.models;
        
        const property = await Property.findByPk(propertyId);
        if(!property.published) {
            return res.send(400).send({
                messages: [{
                    message: "Property is not public",
                    error: true,
                }]
            });
        }
        
        // We get the user from the property
        const userId = property.userId;
        
        const propertyFolder = new PropertyFolder(userId, propertyId);
        
        return res.send({
            images: propertyFolder.publicImagesPath(),
            imageNames: propertyFolder.imagesName(),
            messages: []
        });
    } catch(err) {
        console.error(err);
        
        // Send nothing back
        return res.send({
            images: [],
            messages: [{
                message: "Unknown error",
                error: true,
            }]
        })
    }
});

export default getAllRouter;
