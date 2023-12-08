import { check, validationResult } from "express-validator";
import express from "express";

import { generateJwtToken } from "../../helpers/tokens.js";
import User from "../../models/User.js";
import expand from "../../controllers/expand.js";

const loginRouter = express.Router();

// Frontend authentication
loginRouter.get("/login", async (req, res) => {
    console.log(`User`);
    console.log(req.user);
    
    let expanded = expand(req);
    return res.render("auth/login", {
        page: `Login`,
        ...expanded,
    });
});

// Backend authentication 
loginRouter.post("/login", async (req, res) => {
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
    let loginUrl = `auth/login`;
    
    console.log(`User validated!`);
    
    // Confirm that the user is Ok
    if(!result.isEmpty()) {
        return res.render(loginUrl, {
            page: "Login",
            errors: result.array(),
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
        return res.render(loginUrl, {
            page: "Login",
            errors: [{
                // Don't tell the user it's the email
                msg: "Email or password is wrong."
            }],
        });
    }
    
    // Check that the user is verified
    if(!user.confirmedEmail) {
        return res.render(loginUrl, {
            page: "Login",
            errors: [{
                msg: "The E-Mail is not verified, if you are the owner, please go to your inbox and verify it."
            }],
        });
    }
    
    // Check if passwords match
    if(!user.verifyPassword(password)) {
        return res.render(loginUrl, {
            page: "Login",
            errors: [{
                msg: "Email or password is wrong."
            }],
        });
    }
    
    // Remove the password from the user object
    const userSafe = {
        ...user.dataValues,
        // Remove sensitive stuff
        password: "",
        token: "",
    };
    const token = generateJwtToken(userSafe);
    
    console.log(`Login ok, redirecting to admin panel`);
    return res.cookie("_token", token, {
        httpOnly: false,
    }).redirect("/user/property/admin");
});

export default loginRouter;
