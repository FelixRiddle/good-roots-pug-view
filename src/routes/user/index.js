import express from "express";

import propertyRoutes from "./property/index.js";

const userRoutes = express.Router();

userRoutes.use("/property", propertyRoutes);

export default userRoutes;
