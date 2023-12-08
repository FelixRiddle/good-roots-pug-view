import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import express from "express";

import expand from "../../../controllers/expand.js";
import User from "../../../models/User.js";

// When resetting the password
const createRouter = express.Router();

createRouter.get("/create/:token", async(req, res) => {
    let expanded = expand(req);
    let { token } = req.params;
    
    return res.render(`${expanded.websiteInfo.baseUrl}/user/auth/password/create/${token}`, {
        page: "Reset your password",
    });
});

createRouter.post("/create/:token", async (req, res) => {
    let expanded = expand(req);
    let { token } = req.params;
    
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
        return res.render(`${expanded.websiteInfo.baseUrl}/user/auth/password/create/${token}`, {
            page: "Reset your password",
            errors: result.array(),
        });
    }
    
    // Check that passwords match
    if(req.body.password != req.body.confirmPassword) {
        return res.render(`${expanded.websiteInfo.baseUrl}/user/auth/password/create/${token}`, {
            page: "Reset your password",
            errors: [{
                msg: "Passwords don't match."
            }],
            user: req.body
        });
    }
    
    // If the user was found, then it's correct
    const user = await User.findOne({
        where: {
            token
        }
    });
    if(!user) {
        return res.render(`${expanded.websiteInfo.baseUrl}/user/auth/password/create/${token}`, {
            page: "Reset your password",
            errors: [{
                msg: "Wrong token or user."
            }],
            user: req.body
        });
    }
    
    // Hash password
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(
        password,
        salt
    );
    
    // Delete the token
    user.token = "";
    
    // Save user
    await user.save();
    
    // TODO: Inform the user that the password has changed
    return res.render(`${expanded.websiteInfo.baseUrl}/user/auth/login`, {
        page: "Login",
    });
});

export default createRouter;
