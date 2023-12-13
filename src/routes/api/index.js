import express from "express";
import locationRouter from "./location/index.js";

const apiRouter = express.Router();

apiRouter.use("/location", locationRouter);

export default apiRouter;
