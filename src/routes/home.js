import express from "express";

import expand from "../controllers/expand.js"

const homeRouter = express.Router();

const renderHome = (req, res) => {
    console.log(`Rendering home!`);
    
    let data = expand(req);
    console.log(`Data: `, data);
    return res.render(
        "/home/felix/Repositories/Tutorials/bienesraices_mvc/views/home.pug", {
            ...data
        }
    );
};

homeRouter.get("/home", renderHome);
homeRouter.get("/", renderHome);

export default homeRouter;
