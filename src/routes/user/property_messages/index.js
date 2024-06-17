import express from "express";
import GeneralPropertyInformation from "../../../lib/model/GeneralPropertyInformation.js";

const propertyMesssagesRouter = express.Router();

/**
 * User sends a message to a property owner - The route
 */
propertyMesssagesRouter.post("/", async (req, res) => {
    try {
        console.log(`[POST] /user/property_messages`);
        
        const {
            propertyId,
            message,
        } = req.body;
        
        // First validate message length
        if(message.length <= 3) {
            return res.status(400).send({
                messages: [{
                    message: "Message is too short",
                    error: true,
                }],
                messageSent: false,
            });
        }
        
        const { PropertySellerMessage, Property } = req.models;
        
        // Find property to validate that it exists
        const property = Property.findByPk(propertyId);
        if(!property) {
            console.log(`Property with id: ${propertyId}, doesn't exists!`);
            return res.status(400).send({
                messages: [{
                    message: "Property doesn't exists",
                    error: true,
                }],
                messageSent: false,
            });
        }
        
        // User info
        const user = req.user;
        const userId = user.id;
        
        // Create general property information record
        // Get also creates if it doesn't exist
        const generalPropertyInfo = new GeneralPropertyInformation(req.models, propertyId);
        const generalPropertyInformation = await generalPropertyInfo.get();
        const generalId = generalPropertyInformation.id;
        
        // Message object
        const messageObject = {
            message,
            propertyId,
            userId,
            generalPropertyInformationId: generalId,
        };
        
        // Store message
        await PropertySellerMessage.create(messageObject);
        
        return res.send({
            messages: [{
                message: "Message sent",
                error: false,
            }],
            messageSent: true,
        });
    } catch(err) {
        console.error(err);
        return res.status(500).send({
            messages: [{
                message: "Couldn't upload the message, unkown error",
                error: true,
            }],
            messageSent: false,
        });
    }
})

export default propertyMesssagesRouter;

