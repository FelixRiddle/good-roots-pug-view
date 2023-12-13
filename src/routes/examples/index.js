import express from "express";

import mapRouter from "./map/index.js";

const examplesRouter = express.Router();

examplesRouter.use("/map", mapRouter)
examplesRouter.get("/", (req, res) => {
    return res.send({status: "Endpoint Ok"});
});

export default examplesRouter;
