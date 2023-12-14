import express from "express";

import draggableMarkerRouter from "./draggable_marker.js";
import quickStartRouter from "./quick_start.js";

const mapRouter = express.Router();

mapRouter.use(draggableMarkerRouter);
mapRouter.use(quickStartRouter);

export default mapRouter;
