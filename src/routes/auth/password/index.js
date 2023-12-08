import express from "express";

import resetRouter from "./reset.js";
import createRouter from "./create.js";

const passwordRouter = express.Router();

passwordRouter.use(createRouter);
passwordRouter.use(resetRouter);

export default passwordRouter;
