import express from "express";

import expand from "../controllers/expand.js";

const notFoundRouter = express.Router();

function showNotFound(req, res) {
    try {
        
        return res.render("404", {
            ...expand(req),
        });
    } catch(err) {
        return res.redirect("home");
    }
}

notFoundRouter.get("/not_found", showNotFound);

notFoundRouter.get("/404", showNotFound);

export default notFoundRouter;
