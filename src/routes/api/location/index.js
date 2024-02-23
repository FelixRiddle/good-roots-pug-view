import express from "express";

import mapRouter from "./map/index.js";
import { protectRoute } from "express-authentication";

const locationRouter = express.Router();

locationRouter.use("/map", protectRoute, mapRouter);

export default locationRouter;
