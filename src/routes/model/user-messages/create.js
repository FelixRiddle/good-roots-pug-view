import express from "express";
import UserMessages from "../../../models/UserMessages.js";

const createRouter = express.Router();

createRouter.post("/create", async(req, res) => {
    try {
        const messageInfo = req.message;
        
        if(!messageInfo.message) {
            return res.send({
                messages: [
                    // Error, no message given
                ]
            });
        }
        
        if(!messageInfo.status) {
            return res.send({
                messages: [
                    // Error, no status given
                ]
            })
        }
        
        // Insert into the database
        const userMessage = await UserMessages.create({
            title: messageInfo.title ? messageInfo.title : "",
            message: messageInfo.message,
            status: messageInfo.status
        });
        
        return res.send({
            messages: [
                // Ok
            ]
        });
    } catch(err) {
        console.error(err);
        return res.send({
            messages: [
                // Error
            ]
        });
    }
});

export default createRouter;
