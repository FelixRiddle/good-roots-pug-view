import express from "express";

import mapRouter from "./map/index.js";

// It works like this
import ExpressAuthentication from "express-authentication";
const { protectRoute } = ExpressAuthentication;

const locationRouter = express.Router();

locationRouter.use("/map", protectRoute, mapRouter);

export default locationRouter;
