import express from "express";

import userRoutes from "./user/index.js";
import protectRoute from "../middleware/protectRoute.js";
import homeRouter from "./home.js";
import authRoutes from "./auth/index.js";

const routes = express.Router();

routes.use("/user", protectRoute, userRoutes);
routes.use("/auth", authRoutes);
routes.use(homeRouter);

export default routes;
