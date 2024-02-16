import express from "express";

const getRouter = express.Router();

getRouter.post("/get", async(req, res) => {
    try {
        
        return;
    } catch(err) {
        console.error(err);
        return;
    }
});

export default getRouter;
