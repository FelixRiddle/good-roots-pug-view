import express from "express";

const router = express.Router();

// Hello
router.route("/login")
    .get((req, res) => {
        return res.render("auth/login", {
            authenticated: true,
        });
    });

export default router;

