import express from "express";

const uploadRouter = express.Router();

uploadRouter.get("/upload", (req, res) => {
    try {
        return res.render("debug/user/property/images/upload");
    } catch(err) {
        console.error(err);
        return;
    }
})

export default uploadRouter;
