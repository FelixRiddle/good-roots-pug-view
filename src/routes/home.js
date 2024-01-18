import express from "express";

import expand from "../controllers/expand.js"

const homeRouter = express.Router();

const renderHome = (req, res) => {
    console.log(`GET /home`);
    
    try {
        const expanded = expand(req);
        
        return res.render("home", {
                ...expanded
            }
        );
    } catch(err) {
        console.error(err);
        // If you can't even render home what do you even do?
        // Maybe just render home with no data
        return res.render("home");
    }
};

homeRouter.get("/feed", renderHome);
homeRouter.get("/home", renderHome);
homeRouter.get("/", renderHome);

export default homeRouter;
