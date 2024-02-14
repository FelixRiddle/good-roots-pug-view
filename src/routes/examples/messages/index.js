import express from "express";
import testRouter from "./test.js";

const messagesRouter = express.Router();

messagesRouter.use(testRouter);

export default messagesRouter;
