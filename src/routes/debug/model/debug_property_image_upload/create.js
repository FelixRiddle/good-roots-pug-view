import express from "express";
import DebugPropertyImageUpload from "../../../../models/DebugPropertyImageUpload.js";
import Message from "../../../../public/js/messages/controller/Message.js";

const createRouter = express.Router();

/**
 * Image info example
 * {
 *      action: 'action name',
 *      imageName: 'image Name',
 *      title: 'title',
 *      status: 1,
 *      message: 'Message',
 * }
 */
createRouter.post("/create", async (req, res) => {
    try {
        const imageInfo = req.body.imageInfo;
        const { message, status } = imageInfo;
        
        const propImage = await DebugPropertyImageUpload.create({
            action: imageInfo.action,
            image_name: imageInfo.imageName,
            title: imageInfo.title,
            message,
            status,
        });
        
        return res.send({
            messages: [
                new Message("Debug property image upload message created", 2),
            ],
        });
    } catch(err) {
        console.log(err);
        return;
    }
});

export default createRouter;
