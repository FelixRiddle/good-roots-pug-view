import express from "express";

import userRoutes from "./user/index.js";
import protectRoute from "../middleware/auth/protectRoute.js";
import homeRouter from "./home.js";
import authRoutes from "./auth/index.js";
import apiRouter from "./api/index.js";
import examplesRouter from "./examples/index.js";

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/examples", examplesRouter);
routes.use("/user", protectRoute, userRoutes);
routes.use("/api", apiRouter);
routes.use(homeRouter);

export default routes;
