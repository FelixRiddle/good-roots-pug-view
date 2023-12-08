import express from "express";

import propertyRoutes from "./property/index.js";
import profileRouter from "./profile.js";

const userRoutes = express.Router();

// Insert other routers
userRoutes.use("/property", propertyRoutes);
userRoutes.use(profileRouter);

export default userRoutes;
