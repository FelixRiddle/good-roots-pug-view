import express from "express";

import protectRoute from "../../../middleware/auth/protectRoute.js";

// Routers
import adminRoutes from "./admin.js";
import createPropertyRouter from "./create.js";
import editRouter from "./edit.js";
import setImageRouter from "./setImage.js";

const propertyRoutes = express.Router();

// This router middleware
propertyRoutes.use(protectRoute);

// Use these routers
propertyRoutes.use(adminRoutes);
propertyRoutes.use(createPropertyRouter);
propertyRoutes.use(editRouter);
propertyRoutes.use(setImageRouter);

export default propertyRoutes;
