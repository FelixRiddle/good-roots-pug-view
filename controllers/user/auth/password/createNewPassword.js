import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import User from "../../../../models/User.js";

// When resetting the password
const createNewPassword = async (req, res) => {
    // Validate password
    await check("password").isLength({ min: 8 }).withMessage("The password is too short").run(req);
    // Check that it's not bigger than 64
    await check("password").isLength({ max: 64 }).withMessage("The password can't be bigger than 64 characters").run(req);
    
    // The same for confirm password
    await check("confirmPassword").isLength({ min: 8 }).withMessage("The password is too short").run(req);
    // Check that it's not bigger than 64
    await check("confirmPassword").isLength({ max: 64 }).withMessage("The password can't be bigger than 64 characters").run(req);
    
    // Check if tests passed
    let result = validationResult(req);
    if(!result.isEmpty()) {
        return res.render("auth/resetPassword", {
            page: "Reset your password",
            csrfToken: req.csrfToken(),
            errors: result.array(),
        })
    }
    
    // Check that passwords match
    if(req.body.password != req.body.confirmPassword) {
        return res.render("auth/resetPassword", {
            page: "Create account",
            errors: [
                {
                    msg: "Passwords don't match."
                }
            ],
            csrfToken: req.csrfToken(),
            user: req.body,
        });
    }
    
    // Verify the token
    const { token } = req.params;
    // If the user was found, then it's correct
    const user = await User.findOne({
        where: {
            token
        }
    });
    if(!user) {
        return res.render("auth/resetPassword", {
            page: "Create account",
            errors: [
                {
                    msg: "Wrong token or user."
                }
            ],
            csrfToken: req.csrfToken(),
            user: req.body,
        });
    }
    
    // Hash password
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    
    user.password = await bcrypt.hash(
        user.password,
        salt
    );
    // Delete the token
    user.token = "";
    
    // Save user
    await user.save();
    
    return res.render("auth/confirmAccount", {
        page: "Password reset success",
        message: "The password has been changed"
    })
}

export default createNewPassword;
