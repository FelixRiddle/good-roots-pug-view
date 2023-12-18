import express from "express";

import multerExampleRouter from "./multer_example.js";
import multerMultipleImages from "./multer_multiple_images.js";

const publishImageRouter = express.Router();

publishImageRouter.use(multerExampleRouter)
publishImageRouter.use(multerMultipleImages);

export default publishImageRouter;
