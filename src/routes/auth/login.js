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

/**
 * A whole class for easier handling of the login validation
 */
export class LoginEndpointValidation {
    errors = [];
    
    /**
     * 
     * @param {object} req Express request object
     * @param {object} userData User data(req.body)
     */
    constructor(req, userData) {
        this.req = req;
        this.userData = userData;
    }
    
    /**
     * Generate response object
     * 
     * @returns 
     */
    responseObject() {
        if(this.errors.length > 0) {
            return {
                messages: this.errors,
                loggedIn: false,
            };
        } else {
            return {
                loggedIn: true,
            };
        }
    }
    
    /**
     * Get user without sensitive fields
     * 
     * @returns {object} User object
     */
    getUserSafe() {
        // Remove the password from the user object
        const userSafe = {
            ...this.user.dataValues,
            // Remove sensitive stuff
            password: "",
            token: "",
        };
        return userSafe;
    }
    
    /**
     * Check if there are errors
     * 
     * @returns {bool} Are there errors
     */
    isError() {
        return this.errors.length > 0;
    }
    
    /**
     * Validate data given
     */
    async loginValidateData() {
        // Validation
        await check("password")
            .notEmpty()
            .withMessage("The password is required")
            .run(this.req);
        await check("email")
            .isEmail()
            .withMessage("The email is wrong")
            .run(this.req);
        
        // Check result
        let result = validationResult(this.req);
        
        // Confirm that the user is Ok
        if(!result.isEmpty()) {
            console.log(`The user didn't pass validation`);
            
            // Append errors
            this.errors.push.apply(result.array);
        }
    }
    
    /**
     * Validate user
     * 
     * @returns {bool} True if the user was validated
     */
    async validateUser() {
        // Get user data
        const { email, password } = this.userData;
        
        // Get the user
        let user = await User.findOne({
            where: {
                email,
            }
        });
        this.user = user;
        
        // Check if user exists
        if(!user) {
            console.log(`The user doesn't exists`);
            this.errors.push({
                // Don't tell the user it's the email
                message: "Email or password is wrong.",
                error: true,
            });
            return false;
        }
        
        // Check that the user is verified
        if(!user.confirmedEmail) {
            console.log(`The user hasn't confirmed the email`);
            this.errors.push({
                message: "The E-Mail is not verified, if you are the owner, please go to your inbox and verify it.",
                error: true,
            });
            return false;
        }
        
        // Check if passwords match
        if(!user.verifyPassword(password)) {
            console.log(`The password is incorrect`);
            this.errors.push({
                message: "Email or password is wrong.",
                error: true,
            });
            return false;
        }
        
        return true;
    }
    
    /**
     * Validate data given
     */
    async loginValidation() {
        // Validate data
        await this.loginValidateData();
        
        // If there are errors, don't make unnecessary requests to the database and return now
        if(this.isError()) {
            return this.responseObject();
        }
        
        // Validate user
        await this.validateUser();
        
        // Whether it's okay or not this will return the correct answer
        return this.responseObject();
    }
}


// Backend authentication 
loginRouter.post("/login", async (req, res) => {
    const home = `${serverUrl()}/home`;
    console.log(`POST /auth/login`);
    
    try {
        const loginVal = new LoginEndpointValidation(req, req.body);
        
        // The result is the response object
        const result = await loginVal.loginValidation();
        // Check if it's an error, and if it's send it
        if(loginVal.isError()) {
            return res.send(result);
        }
        
        // Create jwt token
        const userSafe = loginVal.getUserSafe();
        const token = generateJwtToken(userSafe);
        
        console.log(`Login ok, storing user cookie and redirecting to home`);
        
        // Store cookie
        return res
            .cookie("_token", token, {
                httpOnly: false,
            })
            .redirect(home);
    } catch(err) {
        console.error(err);
        console.log(`There was an error when the user tried to log in redirecting to home`);
        return res.redirect(home);
    }
});

export default loginRouter;
