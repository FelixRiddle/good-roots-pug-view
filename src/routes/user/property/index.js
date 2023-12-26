import express from "express";

// Routers
import adminRoutes from "./admin.js";
import createPropertyRouter from "./create.js";
import editRouter from "./edit.js";
import setImageRouter from "./set_image.js";
import operationRoutes from "./operation/index.js";
import imagesRouter from "./images/index.js";
import userFolderMiddleware from "../../../middleware/user/userFolderMiddleware.js";

const propertyRoutes = express.Router();

// Use these routers
propertyRoutes.use(adminRoutes);
propertyRoutes.use(createPropertyRouter);
propertyRoutes.use(editRouter);
propertyRoutes.use(setImageRouter);

// Mini apps
propertyRoutes.use("/images", userFolderMiddleware, imagesRouter);
propertyRoutes.use("/operation", operationRoutes);

export default propertyRoutes;
