import express from "express";
import GeneralPropertyInformation from "../../../lib/model/GeneralPropertyInformation.js";
import { dateUserView } from "../../../lib/helpers/date.js";

const propertyMessagesRouter = express.Router();

/**
 * Endpoint to see all property messages
 */
propertyMessagesRouter.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        
        console.log(`[GET] /user/property_messages/${id}`);
        
        const {
            User,
            Property,
            PropertySellerMessage
        } = req.models;
        
        // Property exists
        const property = await Property.findByPk(id);
        if(!property) {
            return res.render("user/property/admin");
        }
        
        // The user is the owner
        const isOwner = property.userId === req.user.id;
        if(!isOwner) {
            return res.render("user/property/admin");
        }
        
        // Messages are related to general property information
        const generalPropertyInformation = new GeneralPropertyInformation(req.models, id);
        const model = await generalPropertyInformation.get();
        if(!model) {
            return res.render("user/property/admin");
        }
        
        // Sequelize and others should learn the 'builder pattern' of Rust programming language
        // TODO: We can't fetch thousands of messages, this has to be paginated
        // Get messages
        const messages = await PropertySellerMessage.findAll({
            where: {
                generalPropertyInformationId: id,
            },
            include: [{
                model: User,
                // as: "user",
                attributes: ["id", "name"],
            }]
        });
        
        return res.render("user/property_messages", {
            messages,
            dateUserView
        });
    } catch(err) {
        console.error(err);
        return res.render("user/property/admin");
    }
});

/**
 * User sends a message to a property owner - The route
 */
propertyMessagesRouter.post("/", async (req, res) => {
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

export default propertyMessagesRouter;

