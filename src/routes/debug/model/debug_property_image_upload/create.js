import express from "express";

import { DebugPropertyImageUploadModel } from "../../../../mappings/models/index.js";

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
        const { message, status, actionCourseUuid, actionStage } = imageInfo;
        
        const propImage = await DebugPropertyImageUploadModel().create({
            action: imageInfo.action,
            imageNames: imageInfo.imageNames,
            title: imageInfo.title,
            message,
            status,
            actionCourseUuid,
            actionStage
        });
        // propImage.save();
        console.log(`Prop image debug saved`);
        
        return res.send({
            messages: [
                new Message("Debug property image upload message created", 2),
            ],
        });
    } catch(err) {
        console.log(err);
        return res.send({
            messages: [
                new Message("Unknown error.", 4)
            ]
        });
    }
});

export default createRouter;
