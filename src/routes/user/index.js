import express from "express";

import propertyRoutes from "./property/index.js";
import profileRouter from "./profile.js";
import propertyMesssagesRouter from "./property_messages/index.js";

const userRoutes = express.Router();

// Insert other routers
userRoutes.use("/property", propertyRoutes);
userRoutes.use("/property_messages", propertyMesssagesRouter);
userRoutes.use(profileRouter);

export default userRoutes;
