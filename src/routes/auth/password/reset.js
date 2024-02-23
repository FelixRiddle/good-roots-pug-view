import express from "express";

import expand from "../../../controllers/expand.js";

const resetRouter = express.Router();

// Forgot password
resetRouter.get("/reset", async (req, res) => {
    let expanded = expand(req);
    return res.render(`${expanded.websiteInfo.baseUrl}/user/auth/password/reset`, {
        page: "Reset your password",
    });
});

export default resetRouter;
