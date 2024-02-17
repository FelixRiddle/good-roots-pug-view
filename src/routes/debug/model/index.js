import express from "express";

import debugPropertyImageUploadRouter from "./debug_property_image_upload/index.js";

const modelRouter = express.Router();

modelRouter.use("/debug_property_image_upload", debugPropertyImageUploadRouter);

export default modelRouter;
