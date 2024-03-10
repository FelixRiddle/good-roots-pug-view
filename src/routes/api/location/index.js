import express from "express";

import mapRouter from "./map/index.js";

// It works like this
import ExpressAuthentication from "express-authentication";
const { publicMiddleware } = ExpressAuthentication;

const locationRouter = express.Router();

locationRouter.use("/map", publicMiddleware.authenticatedUserProtection, mapRouter);

export default locationRouter;
