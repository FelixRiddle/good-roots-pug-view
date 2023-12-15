import express from "express";

import expand from "../../../controllers/expand.js";

const liveUserRouter = express.Router();

liveUserRouter.get("/live_user", (req, res) => {
    return res.render("examples/map/live_user", {
        page: "Live user",
        ...expand(req),
    });
});

export default liveUserRouter;
