import express from "express";

import allRoutes from "./all.js";

const nearMeRouter = express.Router();

nearMeRouter.use(allRoutes);

export default nearMeRouter;
