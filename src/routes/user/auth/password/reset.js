import { check, validationResult } from "express-validator";
import express from "express";

import { emailForgotPassword } from "../../../../helpers/emails.js";
import { generateId } from "../../../../helpers/tokens.js";
import User from "../../../../models/User.js";
import expand from "../../../../controllers/expand.js";

const resetRouter = express.Router();


// Forgot password
resetRouter.get("/reset", async (req, res) => {
    let expanded = expand(req);
    return res.render(`${expanded.websiteInfo.baseUrl}/user/auth/password/reset`, {
        page: "Reset your password",
    });
});


// Reset password
resetRouter.post("/reset", async (req, res) => {
    let expanded = expand(req);
    
    // Validation
    await check("email").isEmail().withMessage("The email is wrong").run(req);
    
    let result = validationResult(req);
    
    // Confirm that the user is Ok
    if(!result.isEmpty()) {
        return res.render(`${expanded.websiteInfo.baseUrl}/user/auth/password/reset`, {
            page: "Reset your password",
            errors: result.array(),
        });
    }
    
    // Search for the user
    const { email } = req.body;
    const user = await User.findOne({
        where: {
            email
        }
    });
    if(!user) {
        return res.render(`${expanded.websiteInfo.baseUrl}/user/auth/password/reset`, {
            page: "Reset your password",
            errors: [{
                msg: "The given email doesn't exists in the database"
            }],
        });
    }
    
    // Generate a token and send the id
    user.token = generateId();
    await user.save();
    
    // Send an email
    emailForgotPassword({
        name: user.name,
        email,
        token: user.token,
    });
    
    // TODO: Show confirmation message
    return res.render(`${expanded.websiteInfo.baseUrl}/home`, {
        page: "Good roots",
    });
});

export default resetRouter;
