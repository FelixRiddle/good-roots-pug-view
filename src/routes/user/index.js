import express from "express";

import propertyRoutes from "./property/index.js";

const userRoutes = express.Router();

// Insert other routers
userRoutes.use("/property", propertyRoutes);

export default userRoutes;
