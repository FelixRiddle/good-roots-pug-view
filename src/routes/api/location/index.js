import express from "express";

import mapRouter from "./map/index.js";
import authenticatedUserProtection from "../../../middleware/auth/authenticatedUserProtection.js";

const locationRouter = express.Router();

locationRouter.use("/map", authenticatedUserProtection, mapRouter);

export default locationRouter;
