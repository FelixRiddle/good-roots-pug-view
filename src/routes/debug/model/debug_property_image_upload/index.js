import express from "express";

import getRouter from "./get.js";
import createRouter from "./create.js";

const debugPropertyImageUploadRouter = express.Router();

debugPropertyImageUploadRouter.use(getRouter);
debugPropertyImageUploadRouter.use(createRouter)

export default debugPropertyImageUploadRouter;
