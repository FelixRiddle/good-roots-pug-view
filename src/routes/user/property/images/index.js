import express from "express";

import addImageRouter from "./add_image.js";
import addImagePreflightRouter from "./add_image_preflight.js";

const imagesRouter = express.Router();

imagesRouter.use(addImagePreflightRouter);
imagesRouter.use(addImageRouter);

export default imagesRouter;
