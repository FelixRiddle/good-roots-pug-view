import express from "express";

import quickStartRouter from "./quick_start.js";

const mapRouter = express.Router();

mapRouter.use(quickStartRouter);

export default mapRouter;
