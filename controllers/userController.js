import { check, validationResult } from "express-validator";

import User from "../models/User.js";

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

const register = async (req, res) => {
    // Validation
    await check("name").notEmpty().withMessage("Name can't be empty").run(req);
    await check("email").isEmail().withMessage("The email is wrong").run(req);
    await check("password").isLength({ min: 8 }).withMessage("The password is too short").run(req);
    await check("confirmPassword")
        .isLength({ min: 8})
        .equals("password")
        .withMessage("Passwords don't match")
        .run(req);
    
    let result = validationResult(req);
    
    // Confirm that the user is Ok
    if(!result.isEmpty()) {
        return res.render("auth/register", {
            page: "Create account",
            errors: result.array(),
            user: req.body,
        });
    }
    
    // Verify that the user is not duplicated
    const userExists = await User.findOne({ where: { email: req.body.email } });
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
    const user = await User.create(req.body);
    
    res.json(user);
};

const forgotPasswordFormulary = (req, res) => {
    res.render("auth/forgotPassword", {
        page: "Forgot password"
    });
};

export {
    loginFormulary,
    registerFormulary,
    register,
    forgotPasswordFormulary
};
