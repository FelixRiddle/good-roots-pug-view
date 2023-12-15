import express from "express";

import mapRouter from "./map/index.js";
import protectRoute from "../../../middleware/auth/protectRoute.js";

const locationRouter = express.Router();

locationRouter.use("/map", protectRoute, mapRouter);

export default locationRouter;
