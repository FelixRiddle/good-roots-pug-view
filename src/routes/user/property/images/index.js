import express from "express";

import addImageRouter from "./add_image.js";

const imagesRouter = express.Router();

imagesRouter.use(addImageRouter);

export default imagesRouter;
