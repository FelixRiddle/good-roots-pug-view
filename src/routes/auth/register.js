import express from "express";

import { registerEmail } from "../../helpers/emails.js";
import { generateId } from "../../helpers/tokens.js";
import User from "../../models/User.js";
import expand from "../../controllers/expand.js";
import validateRegister from "../../public/js/validation/validateRegister.js";

const registerRouter = express.Router();

registerRouter.get("/register", (req, res) => {
    return res.render("auth/register", {
        page: "Register",
        ...expand(req)
    });
});

// Register user route
registerRouter.post("/register", async (req, res) => {
    try {
        // Check that passwords match
        let expanded = expand(req);
        if(req.body.password != req.body.confirmPassword) {
            return res.render("auth/register", {
                // Expanded data
                ...req.body,
                ...expanded,
                page: "Create account",
                messages: [{
                    message: "Passwords don't match.",
                    error: true,
                }],
                user: req.body,
                userRegistered: false,
            });
        }
        
        // Validate data
        let val = validateRegister(req.body);
        if(val.length > 0) {
            return res.render("auth/register", {
                // Expanded data
                ...req.body,
                ...expanded,
                // New data
                page: "Create account",
                messages: [...val],
                user: req.body,
                userRegistered: false,
            });
        }
        
        // Get data
        let { name, email, password } = req.body;
        
        // Verify that the user is not duplicated
        const userExists = await User.findOne({ where: { email } });
        if(userExists) {
            return res.render("auth/register", {
                // Expanded data
                ...req.body,
                ...expanded,
                page: "Create account",
                messages: [{
                    message: "The given E-Mail is already in use, try another or log in.",
                    error: false,
                }],
                user: req.body,
                userRegistered: false,
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
        return res.render("home", {
            // Expanded data
            ...req.body,
            ...expanded,
            page: "Account created",
            messages: [{
                message: "We've sent a message to your E-Mail inbox, open it to confirm your account.",
                // Some messages should be notified, others not
                shouldNotify: true,
                error: false,
            }],
            userRegistered: true,
        });
    } catch(err) {
        console.log(`Error: `, err);
        let expanded = expand(req);
        // Show confirmation message
        return res.render("auth/register", {
            // Expanded data
            ...req.body,
            ...expanded,
            page: "Create account",
            messages: [{
                message: "Internal error, if the error persists, please report it.",
                // Some messages should be notified, others not
                shouldNotify: true,
                error: true,
            }],
            userRegistered: false,
        });
    }
});

export default registerRouter;
