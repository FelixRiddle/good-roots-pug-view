import express from "express";

import expand from "../../controllers/expand.js";

const registerRouter = express.Router();

registerRouter.get("/register", (req, res) => {
    return res.render("auth/register", {
        page: "Register",
        ...expand(req)
    });
});

export default registerRouter;
