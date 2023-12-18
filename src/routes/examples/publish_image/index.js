import express from "express";

import multerExampleRouter from "./multer_example.js";

const publishImageRouter = express.Router();

publishImageRouter.use(multerExampleRouter)

export default publishImageRouter;
