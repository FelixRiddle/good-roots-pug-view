import express from "express";

import viewRoute from "./view.js";
import propertyOperationRouter from "./operation/index.js";

const propertyRoutes = express.Router();

propertyRoutes.use("/operation", propertyOperationRouter);
propertyRoutes.use(viewRoute);

export default propertyRoutes;
