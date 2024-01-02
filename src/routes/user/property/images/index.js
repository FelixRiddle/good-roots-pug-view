import express from "express";

import addImageRouter from "./add_image.js";
import addImagePreflightRouter from "./add_image_preflight.js";
import getAllRouter from "./get_all.js";
import setImageRouter from "./set_image.js";
import removeImageRouter from "./remove_image.js";

const imagesRouter = express.Router();

imagesRouter.use(addImagePreflightRouter);
imagesRouter.use(addImageRouter);
imagesRouter.use(getAllRouter);
imagesRouter.use(removeImageRouter);
imagesRouter.use(setImageRouter);

export default imagesRouter;
