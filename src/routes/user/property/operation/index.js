import express from "express";

import getAllRoutes from "./get_all.js";

const operationRoutes = express.Router();

// Use these routers
operationRoutes.use(getAllRoutes);

export default operationRoutes;
