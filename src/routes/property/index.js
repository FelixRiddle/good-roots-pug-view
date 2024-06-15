import express from "express";

import viewRoute from "./view.js";
import propertyOperationRouter from "./operation/index.js";
import optionalGetUser from "../../middleware/auth/optionalGetUser.js";

const propertyRoutes = express.Router();

propertyRoutes.use("/operation", propertyOperationRouter);
propertyRoutes.use(optionalGetUser, viewRoute);

export default propertyRoutes;
