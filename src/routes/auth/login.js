import { check, validationResult } from "express-validator";
import express from "express";

import { generateJwtToken } from "../../helpers/tokens.js";
import User from "../../models/User.js";
import expand from "../../controllers/expand.js";
import { serverUrl } from "../../controllers/env/env.js";

const loginRouter = express.Router();

// Frontend authentication
loginRouter.get("/login", async (req, res) => {
    const home = `${serverUrl()}/home`;
    
    try {
        console.log(`User`);
        console.log(req.user);
        
        let expanded = expand(req);
        return res.render("auth/login", {
            page: `Login`,
            ...expanded,
        });
    } catch(err) {
        console.error(err);
        return res.redirect(home);
    }
});

// Backend authentication 
loginRouter.post("/login", async (req, res) => {
    const home = `${serverUrl()}/home`;
    console.log(`POST /auth/login`);
    
    try {
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
            console.log(`The user didn't pass validation`);
            return res.send({
                page: "Login",
                errors: result.array(),
                loggedIn: false,
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
            console.log(`The user doesn't exists`);
            return res.send({
                page: "Login",
                errors: [{
                    // Don't tell the user it's the email
                    msg: "Email or password is wrong."
                }],
                loggedIn: false,
            });
        }
        
        // Check that the user is verified
        if(!user.confirmedEmail) {
            console.log(`The user hasn't confirmed the email`);
            return res.send({
                page: "Login",
                errors: [{
                    msg: "The E-Mail is not verified, if you are the owner, please go to your inbox and verify it."
                }],
                loggedIn: false,
            });
        }
        
        // Check if passwords match
        if(!user.verifyPassword(password)) {
            console.log(`The password is incorrect`);
            return res.send({
                page: "Login",
                errors: [{
                    msg: "Email or password is wrong."
                }],
                loggedIn: false,
            });
        }
        
        // Remove the password from the user object
        const userSafe = {
            ...user.dataValues,
            // Remove sensitive stuff
            password: "",
            token: "",
            loggedIn: false,
        };
        const token = generateJwtToken(userSafe);
        
        console.log(`Login ok, redirecting to admin panel`);
        return res.cookie("_token", token, {
            httpOnly: false,
        }).redirect("/user/property/admin");
    } catch(err) {
        console.error(err);
        console.log(`There was an error when the user tried to log in redirecting to home`);
        return res.redirect(home);
    }
});

export default loginRouter;
