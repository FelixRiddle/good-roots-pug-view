import express from "express";

// Routers
import adminRoutes from "./admin.js";
import createPropertyRouter from "./create.js";
import editRouter from "./edit.js";
import setImageRouter from "./set_image.js";
import operationRoutes from "./operation/index.js";

const propertyRoutes = express.Router();

// Use these routers
propertyRoutes.use(adminRoutes);
propertyRoutes.use(createPropertyRouter);
propertyRoutes.use(editRouter);
propertyRoutes.use(setImageRouter);
propertyRoutes.use("/operation", operationRoutes);

export default propertyRoutes;
