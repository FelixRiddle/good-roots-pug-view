import express from "express";

import getAllRoutes from "./get_all.js";

const propertyOperationRouter = express.Router();

propertyOperationRouter.use(getAllRoutes);

export default propertyOperationRouter;
