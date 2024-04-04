import express from "express";

import expand from "../../controllers/expand.js";

const registerRouter = express.Router();

registerRouter.post("/register", (req, res) => {
    try {
        
        
        
        return res.send({
            userRegistered: true,
            messages: [],
        });
    } catch(err) {
        console.error(err);
        return res.send({
            userRegistered: false,
            messages: [],
        });
    }
});

registerRouter.get("/register", (req, res) => {
    return res.render("auth/register", {
        page: "Register",
        ...expand(req)
    });
});

export default registerRouter;
