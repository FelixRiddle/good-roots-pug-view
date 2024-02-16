import express from "express";

import userMessagesRouter from "./user_messages/index.js";

const modelRouter = express.Router();

modelRouter.use("/user_messages", userMessagesRouter);

export default modelRouter;
