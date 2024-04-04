import express from "express";

import locationRouter from "./location/index.js";

const apiRouter = express.Router();

apiRouter.use("/location", locationRouter);

// Don't remove routes

export default apiRouter;
