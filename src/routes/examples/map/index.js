import express from "express";

import draggableMarkerRouter from "./draggable_marker.js";
import quickStartRouter from "./quick_start.js";
import streetNameRouter from "./street_name.js";
import liveUserRouter from "./live_user.js";

const mapRouter = express.Router();

mapRouter.use(draggableMarkerRouter);
mapRouter.use(liveUserRouter);
mapRouter.use(quickStartRouter);
mapRouter.use(streetNameRouter);

export default mapRouter;
