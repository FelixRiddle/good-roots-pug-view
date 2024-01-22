import express from "express";

import expand from "../controllers/expand.js"
import Category from "../models/Category.js";
import Price from "../models/Price.js";

const homeRouter = express.Router();

const renderHome = async (req, res) => {
    console.log(`GET /home`);
    
    try {
        const expanded = expand(req);
        
        const [categories, prices] = await Promise.all([
            Category.findAll({raw: true}),
            Price.findAll({raw: true})
        ]);
        
        return res.render("home", {
            ...expanded,
            categories,
            prices,
        });
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
