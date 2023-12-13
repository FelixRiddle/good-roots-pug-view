import express from "express";

const quickStartRouter = express.Router();

quickStartRouter.get("/quick_start", (req, res) => {
    return res.render("examples/map/quick_start");
});

export default quickStartRouter;
