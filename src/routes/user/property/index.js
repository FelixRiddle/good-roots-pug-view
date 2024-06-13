/**
 * This is for user properties
 * 
 * This is not meant for anything else, for example:
 * * Send message to property
 * This should be done in another endpoint, which requires a logged in user.
 * 
 * But the messages can be retrieved for this user.
 */
import express from "express";

// Routers
import adminRoutes from "./admin.js";
import createPropertyRouter from "./create.js";
import deleteRouter from "./delete.js";
import editRouter from "./edit.js";
import setImageRouter from "./set_image.js";
import operationRoutes from "./operation/index.js";
import imagesRouter from "./images/index.js";
import publishPropertyRouter from "./publish_property.js";

const propertyRoutes = express.Router();

// Use these routers
propertyRoutes.use(adminRoutes);
propertyRoutes.use(createPropertyRouter);
propertyRoutes.use(deleteRouter);
propertyRoutes.use(editRouter);
propertyRoutes.use(publishPropertyRouter);
propertyRoutes.use(setImageRouter);

// Mini apps
// Images
propertyRoutes.get("/images", (req, res) => {
    console.log("Images endpoint");
    return res.send({
        message: "Request ok"
    });
});
propertyRoutes.use("/images", imagesRouter);

propertyRoutes.use("/operation", operationRoutes);

export default propertyRoutes;
