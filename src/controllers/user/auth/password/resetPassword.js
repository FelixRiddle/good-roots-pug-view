import { check, validationResult } from "express-validator";

import { emailForgotPassword } from "../../../../helpers/emails.js";
import { generateId } from "../../../../helpers/tokens.js";
import User from "../../../../models/User.js";

// Reset password
const resetPassword = async (req, res) => {
    // Validation
    await check("email").isEmail().withMessage("The email is wrong").run(req);
    
    let result = validationResult(req);
    
    // Confirm that the user is Ok
    if(!result.isEmpty()) {
        return res.render("auth/forgotPassword", {
            page: "Recover access to your account",
            errors: result.array(),
            csrfToken: req.csrfToken(),
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
        return res.render("auth/forgotPassword", {
            page: "Recover access to your account",
            errors: [{
                msg: "The given email doesn't exists in the database"
            }],
            csrfToken: req.csrfToken(),
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
    })
    
    // Show confirmation message
    return res.render("templates/message", {
        page: "Reset password",
        message: "We've sent an email with instructions."
    });
}

export default resetPassword;
