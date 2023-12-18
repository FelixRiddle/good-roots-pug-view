import express from "express";

import multerExampleRouter from "./multer_example.js";
import multerMultipleImages from "./multer_multiple_images.js";
import dropzoneRouter from "./dropzone.js";

const publishImageRouter = express.Router();

publishImageRouter.use(dropzoneRouter);
publishImageRouter.use(multerExampleRouter)
publishImageRouter.use(multerMultipleImages);

export default publishImageRouter;
