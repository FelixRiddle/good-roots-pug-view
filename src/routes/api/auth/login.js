import express from "express";

const loginRouter = express.Router();

loginRouter.post("/login", async (req, res) => {
    try {
        
        return res.send({
            userLoggedIn: true,
            messages: [],
        });
    } catch(err) {
        console.error(err);
        return res.send({
            userLoggedIn: false,
            messages: [],
        });
    }
});

export default loginRouter;
