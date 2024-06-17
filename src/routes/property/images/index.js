import express from "express";
import getAllRouter from "./get_all.js";

const imagesRouter = express.Router();

imagesRouter.use(getAllRouter);

export default imagesRouter;
