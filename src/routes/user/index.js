import express from "express";

import propertyRoutes from "./property/index.js";
import profileRouter from "./profile.js";
import protectRoute from "../../middleware/auth/protectRoute.js";

const userRoutes = express.Router();


// This router middleware
propertyRoutes.use(protectRoute);

// Insert other routers
userRoutes.use("/property", propertyRoutes);
userRoutes.use(profileRouter);

export default userRoutes;
