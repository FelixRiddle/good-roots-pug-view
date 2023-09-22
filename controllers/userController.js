import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { generateId } from "../helpers/tokens.js";
import { registerEmail, emailForgotPassword } from "../helpers/emails.js";

// Backend authentication 
const authenticate = async (req, res) => {
    // Validation
    await check("password")
        .notEmpty()
        .withMessage("The password is required")
        .run(req);
    await check("email")
        .isEmail()
        .withMessage("The email is wrong")
        .run(req);
    
    // Check result
    let result = validationResult(req);
    
    // Confirm that the user is Ok
    if(!result.isEmpty()) {
        return res.render("auth/login", {
            page: "Login",
            errors: result.array(),
            csrfToken: req.csrfToken(),
        });
    }
    
    // Get user data
    const { email, password } = req.body;
    
    // Get the user
    let user = await User.findOne({
        where: {
            email,
        }
    });
    
    // Check if user exists
    if(!user) {
        return res.render("auth/login", {
            page: "Login",
            errors: [
                {
                    // Don't tell the user it's the email
                    msg: "Email or password is wrong."
                }
            ],
            user: req.body,
            csrfToken: req.csrfToken(),
        });
    }
    
    // Check that the user is verified
    if(!user.confirmedEmail) {
        return res.render("auth/login", {
            page: "Login",
            errors: [
                {
                    msg: "The E-Mail is not verified, if you are the owner, please go to your inbox and verify it."
                }
            ],
            user: req.body,
            csrfToken: req.csrfToken(),
        });
    }
    
    // Check if passwords match
    if(!user.verifyPassword(password)) {
        return res.render("auth/login", {
            page: "Login",
            errors: [
                {
                    msg: "Email or password is wrong."
                }
            ],
            user: req.body,
            csrfToken: req.csrfToken(),
        });
    }
    
    // Remove the password from the user object
    const user_safe = {
        ...user,
        // Remove sensitive stuff
        password: "",
        token: "",
    };
    
    // Authenticate user
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
        user_safe,
        secretKey,
        {
            expiresIn: "7d"
        }
    );
    
    return res.render("auth/login", {
        page: "Login"
    });
}

// Frontend authentication
const loginFormulary = async (req, res) => {
    return res.render("auth/login", {
        page: "Login",
        csrfToken: req.csrfToken()
    })
};

const registerFormulary = (req, res) => {
    
    return res.render("auth/register", {
        page: "Register",
        csrfToken: req.csrfToken(),
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

// Forgot password
const forgotPasswordFormulary = async (req, res) => {
    return res.render("auth/forgotPassword", {
        page: "Recover access to your account",
        csrfToken: req.csrfToken(),
    });
};

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

const verifyToken = async (req, res) => {
    const { token } = req.params;
    
    const user = await User.findOne({
        where: {
            token,
        }
    });
    
    // If the user doesn't exists
    if(!user) {
        return res.render("auth/confirmAccount", {
            page: "Reset your password",
            message: "There was an error when trying to validate your account, please try again.",
            error: true,
        });
    }
    
    // Show formulary to modify the password
    return res.render("auth/resetPassword", {
        page: "Reset your password",
        csrfToken: req.csrfToken(),
    });
}

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

export {
    authenticate,
    loginFormulary,
    registerFormulary,
    verifyEmail,
    register,
    forgotPasswordFormulary,
    resetPassword,
    verifyToken,
    createNewPassword,
};
