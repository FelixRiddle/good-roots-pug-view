import express from "express";

import createPropertyRouter from "./create.js";
import protectRoute from "../../../middleware/protectRoute.js";

const propertyRoutes = express.Router();

// This router middleware
propertyRoutes.use(protectRoute);

// Use these routers
propertyRoutes.use(createPropertyRouter)

export default propertyRoutes;
