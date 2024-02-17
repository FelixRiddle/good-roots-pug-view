import express from "express";
import userRouter from "./user/index.js";
import modelRouter from "./model/index.js";

const debugRouter = express.Router();

debugRouter.use("/model", modelRouter)
debugRouter.use("/user", userRouter)

export default debugRouter;
