import express from "express";
import User from "../../models/User.js";

const emailRouter = express.Router();

// Verify that the email is correct
emailRouter.get("/email/:token", async(req, res) => {
    
    // Get the token
    const { token } = req.params;
    
    // Verify if the token is correct
    const user = await User.findOne({
        where: {
            token,
        },
    });
    if(!user) {
        return res.render("home", {
            page: "Error when confirming account",
            message: "User non existent or incorrect token",
            error: true,
        });
    }
    
    // Confirm account
    if(user.token == token) {
        user.token = "";
        user.confirmedEmail = true;
        
        await user.save();
    }
    
    return res.render("home", {
        page: "Email confirmed",
        message: "The user email has been confirmed"
    });
});

export default emailRouter;
