import express from "express";

const deleteRouter = express.Router();

deleteRouter.post("/delete", async(req, res) => {
    try {
        
        return;
    } catch(err) {
        console.error(err);
        return;
    }
});

export default deleteRouter;
