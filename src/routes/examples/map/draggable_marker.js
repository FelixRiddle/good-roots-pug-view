import express from "express";

import expand from "../../../controllers/expand.js";

const draggableMarkerRouter = express.Router();

draggableMarkerRouter.get("/draggable_marker", (req, res) => {
    return res.render("examples/map/draggable_marker", {
        page: "Draggable marker",
        ...expand(req),
    });
});

export default draggableMarkerRouter;
