// NPM Packages
import express from "express";

// My other packages
import { libUserRouter, protectRoute } from "express-authentication";

// Libs
import { authBaseRoute } from "../public/js/controller/auth/authRoute.js";

// Routes
import apiRouter from "./api/index.js";
import authRoutes from "./auth/index.js";
import categoryRouter from "./category.js";
import debugRouter from "./debug/index.js";
import examplesRouter from "./examples/index.js";
import homeRouter from "./home.js";
import modelRouter from "./model/index.js";
import propertyRoutes from "./property/index.js";
import userRoutes from "./user/index.js";

const routes = express.Router();

// Open routes
routes.use("/api", apiRouter);
routes.use("/property", propertyRoutes);

// Protected routes
routes.use("/model", protectRoute, modelRouter);

// Admin routes
// TODO: Admin protection
routes.use("/debug", debugRouter);
routes.use("/examples", examplesRouter);

// --- Auth and user ---
// We've got these two
// Auth must not be protected though
// And we need a base path for these routes
routes.use("/user", protectRoute, userRoutes);

// Frontend authentication routes
routes.use("/auth", authRoutes);

// Backend authentication routes
// Using 'express-authentication'
const AUTH_BASE_ROUTE = authBaseRoute();
console.log(`Auth base route: ${AUTH_BASE_ROUTE}`)
routes.use(AUTH_BASE_ROUTE, libUserRouter());

// --- Public ---
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
