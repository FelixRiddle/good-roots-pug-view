import express from "express";

import geocodingRouter from "./geocoding/index.js";

const mapRouter = express.Router();

mapRouter.use("/geocoding", geocodingRouter);

export default mapRouter;
