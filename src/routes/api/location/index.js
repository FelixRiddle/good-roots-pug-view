import express from "express";

import mapRouter from "./map/index.js";

import ExpressAuthentication from "felixriddle.express-authentication";

const { publicMiddleware } = ExpressAuthentication;
const { authenticatedUserProtection } = publicMiddleware;

const locationRouter = express.Router();

locationRouter.use("/map", authenticatedUserProtection, mapRouter);

export default locationRouter;
