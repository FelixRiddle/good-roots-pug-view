import express from "express";

import viewRoute from "./view.js";

const propertyRoutes = express.Router();

propertyRoutes.use(viewRoute);

export default propertyRoutes;
