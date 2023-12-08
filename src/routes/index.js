import express from "express";

import userRoutes from "./user/index.js";
import protectRoute from "../middleware/protectRoute.js";

const routes = express.Router();

routes.use("/user", protectRoute, userRoutes);

export default routes;
