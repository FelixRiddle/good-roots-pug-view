import express from "express";

import { serverUrl } from "../../../controllers/env/env.js";

// When resetting the password
const createRouter = express.Router();

createRouter.get("/create/:token", async(req, res) => {
    console.log(`GET /auth/password/create/:token`);
    
    let { token } = req.params;
    
    return res.render(`${serverUrl()}/user/auth/password/create/${token}`, {
        page: "Reset your password",
    });
});

export default createRouter;
