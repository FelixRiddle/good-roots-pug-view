import express from "express";

import expand from "../../../controllers/expand.js";

const streetNameRouter = express.Router();

streetNameRouter.get("/street_name", (req, res) => {
    return res.render("examples/map/street_name", {
        page: "Street name",
        ...expand(req),
    });
});

export default streetNameRouter;
