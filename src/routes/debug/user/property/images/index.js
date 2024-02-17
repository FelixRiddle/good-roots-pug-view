import express from "express";

import uploadRouter from "./upload.js";

const imagesRouter = express.Router();

imagesRouter.use(uploadRouter);

export default imagesRouter;
