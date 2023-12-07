import express from "express";

import createPropertyRouter from "./create.js";
import protectRoute from "../../../middleware/protectRoute.js";

const router = express.Router();

// This router middleware
router.use(protectRoute);

// Use these routers
router.use(createPropertyRouter)

export default router;
