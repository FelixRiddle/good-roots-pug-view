import express from "express";

// Routers
import adminRoutes from "./admin.js";
import createPropertyRouter from "./create.js";
import editRouter from "./edit.js";
import setImageRouter from "./set_image.js";

const propertyRoutes = express.Router();

// Use these routers
propertyRoutes.use(adminRoutes);
propertyRoutes.use(createPropertyRouter);
propertyRoutes.use(editRouter);
propertyRoutes.use(setImageRouter);

export default propertyRoutes;
