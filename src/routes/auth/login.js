import express from "express";

import expand from "../../controllers/expand.js";
import { serverUrl } from "../../controllers/env/env.js";

const loginRouter = express.Router();

// Frontend authentication
loginRouter.get("/login", async (req, res) => {
    const home = `${serverUrl()}/home`;
    
    try {
        console.log(`User`);
        console.log(req.user);
        
        let expanded = expand(req);
        return res.render("auth/login", {
            page: `Login`,
            ...expanded,
        });
    } catch(err) {
        console.error(err);
        return res.redirect(home);
    }
});

export default loginRouter;
