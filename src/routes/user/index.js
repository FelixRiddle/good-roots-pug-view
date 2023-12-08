import express from "express";

import propertyRoutes from "./property/index.js";
import authRoutes from "./auth/index.js";

const userRoutes = express.Router();

// Insert other routers
userRoutes.use("/auth", authRoutes);
userRoutes.use("/property", propertyRoutes);

export default userRoutes;
