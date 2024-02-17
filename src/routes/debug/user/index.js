import express from "express";

import propertyRouter from "./property/index.js";

const userRouter = express.Router();

userRouter.use("/property", propertyRouter);

export default userRouter;
