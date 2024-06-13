import express from "express";

const propertyMesssagesRouter = express.Router();

propertyMesssagesRouter.post("/", async (req, res) => {
    try {
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
                }]
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
                }]
            });
        }
        
        const { user } = req.user;
        const userId = user.id;
        
        await PropertySellerMessage.create({
            message,
            propertyId,
            userId,
        });
        
        return res.send({
            messages: [{
                message: "Message sent",
                error: false,
            }]
        });
    } catch(err) {
        console.error(err);
        return res.status(500).send({
            messages: [{
                message: "Couldn't upload the message, unkown error",
                error: true,
            }]
        });
    }
})

export default propertyMesssagesRouter;

