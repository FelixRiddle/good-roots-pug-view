import express from "express";

const testRouter = express.Router();

testRouter.get("/test", (req, res) => {
    try {
        
        return res.render("examples/messages/test", {
        });
    } catch(err) {
        console.error(err);
        return
    }
});

export default testRouter;
