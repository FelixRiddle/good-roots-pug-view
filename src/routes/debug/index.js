import express from "express";
import userRouter from "./user/index.js";

const debugRouter = express.Router();

debugRouter.use("/user", userRouter)

export default debugRouter;
