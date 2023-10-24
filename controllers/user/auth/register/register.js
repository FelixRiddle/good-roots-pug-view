import { check, validationResult } from "express-validator";

import { registerEmail } from "../../../../helpers/emails.js";
import { generateId } from "../../../../helpers/tokens.js";
import User from "../../../../models/User.js";

// Register user route
const register = async (req, res) => {
    
    // Validation
    await check("name").notEmpty().withMessage("Name can't be empty").run(req);
    await check("email").isEmail().withMessage("The email is wrong").run(req);
    await check("password").isLength({ min: 8 }).withMessage("The password is too short").run(req);
    
    // Check that passwords match
    if(req.body.password != req.body.confirmPassword) {
        return res.render("auth/register", {
            page: "Create account",
            errors: [
                {
                    msg: "Passwords don't match."
                }
            ],
            user: req.body,
            csrfToken: req.csrfToken(),
        });
    }
    
    let result = validationResult(req);
    
    // Confirm that the user is Ok
    if(!result.isEmpty()) {
        return res.render("auth/register", {
            page: "Create account",
            errors: result.array(),
            csrfToken: req.csrfToken(),
            user: req.body,
        });
    }
    
    // Get data
    let { name, email, password } = req.body;
    
    // Verify that the user is not duplicated
    const userExists = await User.findOne({ where: { email } });
    if(userExists) {
        return res.render("auth/register", {
            page: "Create account",
            errors: [
                {
                    msg: "The given E-Mail is already in use, try another or log in."
                }
            ],
            csrfToken: req.csrfToken(),
            user: req.body,
        });
    }
    
    // Create user
    const user = await User.create({
        name, email, password,
        token: generateId(),
        confirmedEmail: false,
    });
    
    // Send confirmation email
    registerEmail({
        name,
        email,
        token: user.token,
    });
    
    // Show confirmation message
    return res.render("templates/message", {
        page: "Account created",
        csrfToken: req.csrfToken(),
        message: "We've sent a message to your E-Mail inbox, open it to confirm your account."
    });
};

export default register;
