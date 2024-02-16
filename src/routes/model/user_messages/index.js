import express from "express";

import createRouter from "./create.js";
import deleteRouter from "./delete.js";
import getRouter from "./get.js";

const userMessagesRouter = express.Router();

userMessagesRouter.use(createRouter);
userMessagesRouter.use(deleteRouter);
userMessagesRouter.use(getRouter);

export default userMessagesRouter;
