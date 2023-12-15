import express from "express";

import reverseRouter from "./reverse.js";

const geocodingRouter = express.Router();

geocodingRouter.use(reverseRouter);

export default geocodingRouter;
