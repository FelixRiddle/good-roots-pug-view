import express from "express";

import userRoutes from "./user/index.js";
import protectRoute from "../middleware/auth/protectRoute.js";
import homeRouter from "./home.js";
import authRoutes from "./auth/index.js";
import apiRouter from "./api/index.js";
import examplesRouter from "./examples/index.js";
import propertyRoutes from "./property/index.js";
import categoryRouter from "./category.js";
import modelRouter from "./model/index.js";
import debugRouter from "./debug/index.js";

const routes = express.Router();

// Open routes
routes.use("/api", apiRouter);
routes.use("/auth", authRoutes);
routes.use("/property", propertyRoutes);

// Protected routes
routes.use("/model", protectRoute, modelRouter);
routes.use("/user", protectRoute, userRoutes);

// Admin routes
// TODO: Admin protection
routes.use("/debug", debugRouter);
routes.use("/examples", examplesRouter);

// Public assets folder
routes.use(express.static("public"));

// Access through public alias
// This prevents route protection like /user
// The public shouldn't ever be protected, but most of the functionality already
// uses the 'bare' public version, so it would be a hassle to migrate everything.
routes.use("/public", express.static("public"));

routes.use(homeRouter);
routes.use(categoryRouter);

export default routes;
