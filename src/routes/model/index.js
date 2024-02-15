import express from "express";

import userMessagesRouter from "./user-messages.js";

const modelRouter = express.Router();

modelRouter.use("/model", userMessagesRouter);

export default modelRouter;
