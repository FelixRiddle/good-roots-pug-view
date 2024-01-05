import express from "express";

import userRoutes from "./user/index.js";
import protectRoute from "../middleware/auth/protectRoute.js";
import homeRouter from "./home.js";
import authRoutes from "./auth/index.js";
import apiRouter from "./api/index.js";
import examplesRouter from "./examples/index.js";
import propertyRoutes from "./property/index.js";

const routes = express.Router();

routes.use("/api", apiRouter);
routes.use("/auth", authRoutes);
routes.use("/examples", examplesRouter);
routes.use("/property", propertyRoutes);
routes.use("/user", protectRoute, userRoutes);

// Public assets folder
routes.use(express.static("public"));

routes.use(homeRouter);

export default routes;
