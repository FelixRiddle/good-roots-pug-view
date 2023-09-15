import { check, validationResult } from "express-validator";

import User from "../models/User.js";
import { generateId } from "../helpers/tokens.js";
import { registerEmail } from "../helpers/emails.js";

const loginFormulary = (req, res) => {
    res.render("auth/login", {
        page: "Login"
    });
};

const registerFormulary = (req, res) => {
    res.render("auth/register", {
        page: "Register"
    });
};

// Verify that the email is correct
const verifyEmail = async(req, res) => {
    
    // Get the token
    const { token } = req.params;
    
    // Verify if the token is correct
    const user = await User.findOne({
        where: {
            token,
        },
    });
    if(!user) {
        return res.render("auth/confirmAccount", {
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
    
    return res.render("auth/confirmAccount", {
        page: "Email confirmed",
        message: "The user email has been confirmed"
    });
};

// Register user route
const register = async (req, res) => {
    console.log(`Body: `, req.body);
    
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
        });
    }
    
    let result = validationResult(req);
    
    // Confirm that the user is Ok
    if(!result.isEmpty()) {
        return res.render("auth/register", {
            page: "Create account",
            errors: result.array(),
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
        message: "We've sent a message to your E-Mail inbox, open it to confirm your account."
    });
};

const forgotPasswordFormulary = (req, res) => {
    res.render("auth/forgotPassword", {
        page: "Forgot password"
    });
};

export {
    loginFormulary,
    registerFormulary,
    verifyEmail,
    register,
    forgotPasswordFormulary
};
