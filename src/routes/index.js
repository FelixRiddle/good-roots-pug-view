// NPM Packages
import express from "express";

import ExpressAuthentication from "felixriddle.express-authentication";

// Routes
import apiRouter from "./api/index.js";
import authRoutes from "./auth/index.js";
import categoryRouter from "./category.js";
import debugRouter from "./debug/index.js";
import examplesRouter from "./examples/index.js";
import homeRouter from "./home.js";
import modelRouter from "./model/index.js";
import notFoundRouter from "./not_found.js";
import propertyRoutes from "./property/index.js";
import searchRouter from "./search.js";
import userRoutes from "./user/index.js";
import authenticatedUserProtection from "../middleware/auth/authenticatedUserProtection.js";

const { publicMiddleware } = ExpressAuthentication;
// const { authenticatedUserProtection } = publicMiddleware;

const routes = express.Router();

// TODO: Later on put the main three apps here by installing them as a package
// * Authentication:
// express-authentication
// * Real estate:
// express-real-estate
// * Backdoor access:
// backdoor-server-access(Only development)
routes.use("/app", () => { });

// Open routes
routes.use("/api", apiRouter);
routes.use("/property", propertyRoutes);
routes.use(searchRouter);

// Protected routes
routes.use("/model", authenticatedUserProtection, modelRouter);

// Admin routes
// TODO: Admin protection
routes.use("/debug", debugRouter);
routes.use("/examples", examplesRouter);
routes.use(notFoundRouter);

// --- Auth and user ---
// We've got these two
// Auth must not be protected though
// And we need a base path for these routes
routes.use("/user", authenticatedUserProtection, userRoutes);

// Frontend authentication routes
routes.use("/auth", authRoutes);

// // Backend authentication routes
// // Using 'express-authentication'
// const AUTH_BASE_ROUTE = authBaseRoute();
// console.log(`Auth base route: ${AUTH_BASE_ROUTE}`)
// routes.use(AUTH_BASE_ROUTE, libUserRouter());

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
