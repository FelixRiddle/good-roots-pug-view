import express from "express";

import User from "../../models/User.js";
import protectRoute from "../../middleware/auth/protectRoute.js";

const deleteRouter = express.Router();

deleteRouter.post("/delete", protectRoute, async (req, res) => {
    try {
        const userData = req.user;
        console.log(`User data: `, userData);
        
        // const user = User.findByPk()
        
        return res.send({
            userDeleted: true,
            messages: [{
                message: "User deleted",
                error: false,
            }]
        });
    } catch(err) {
        console.error(`Error: `, err);
        return res.send({
            userDeleted: false,
            messages: [{
                message: "Couldn't delete the user, unknown error",
                error: true,
            }]
        });
    }
});

export default deleteRouter;
