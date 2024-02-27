import express from "express";

import {
    UserMessages
} from "app-models";

import Message from "../../../public/js/messages/controller/Message.js";

const createRouter = express.Router();

createRouter.post("/create", async(req, res) => {
    try {
        const messageInfo = req.message;
        
        if(!messageInfo.message) {
            return res.send({
                messages: [
                    new Message("Message not given", 4)
                ]
            });
        }
        
        if(!messageInfo.status) {
            return res.send({
                messages: [
                    new Message("Status not given", 4)
                ]
            });
        }
        
        // Insert into the database
        const msgsModel = new UserMessages();
        const userMessage = await msgsModel.create({
            title: messageInfo.title ? messageInfo.title : "",
            message: messageInfo.message,
            status: messageInfo.status
        });
        
        return res.send({
            messages: [
                userMessage,
            ]
        });
    } catch(err) {
        console.error(err);
        return res.send({
            messages: [
                new Message("Unknown error when storing a message on the database", 4)
            ]
        });
    }
});

export default createRouter;
