import express from "express";
import imagesRouter from "./images/index.js";

const propertyRouter = express.Router();

propertyRouter.use("/images", imagesRouter);

export default propertyRouter;
