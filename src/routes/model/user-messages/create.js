import express from "express";

const createRouter = express.Router();

createRouter.post("/create", async(req, res) => {
    try {
        
        return;
    } catch(err) {
        console.error(err);
        return;
    }
});

export default createRouter;
