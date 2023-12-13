import express from "express";

import expand from "../../../controllers/expand.js";

const quickStartRouter = express.Router();

quickStartRouter.get("/quick_start", (req, res) => {
    return res.render("examples/map/quick_start", {
        page: "Quick start",
        ...expand(req),
    });
});

export default quickStartRouter;
