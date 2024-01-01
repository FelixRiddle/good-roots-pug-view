import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import expand from "../../controllers/expand.js";
import { serverUrl } from "../../controllers/env/env.js";

const protectRoute = async (req, res, next) =>  {
    try {
        // Check token
        // Get and rename token
        let { _token: token } = req.cookies;
        
        // If there's no token, send the user to the login page
        let expanded = expand(req);
        let loginPage = `${serverUrl()}/auth/login`;
        if(!token) {
            console.log(`No token found, redirecting to ${loginPage}`);
            
            // You can't do this
            // return res.redirect(loginPage, {
            //     ...expanded,
            //     messages: [{
            //         message: "You're not logged in.",
            //         shouldNotify: true,
            //         error: true,
            //     }]
            // });
            return res.redirect(loginPage);
        }
        
        // Validate token
        // Verify user
        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Validate user
        const user = await User.scope("deletePassword").findByPk(decoded.id);
        
        // Store user on the request
        if(user) {
            req.user = user;
        } else {
            console.log(`User not existent going back`);
            return res.redirect(loginPage, {
                ...expanded,
                messages: [{
                    message: "The user doesn't exists!.",
                    shouldNotify: true,
                    error: true,
                }]
            });
        }
        
        return next();
    } catch(err) {
        console.error(err);
        // console.log(`Logging out the user`);
        // return res.clearCookie("_token").redirect(loginPage);
        
        // TODO: Get and set the route where the user was
        let expanded = expand(req);
        return res.redirect(`${serverUrl()}/home`, {
            ...expanded,
            messages: [{
                message: "Internal error, if the error persists, please report it.",
                shouldNotify: true,
                error: true,
            }]
        })
    }
}

export default protectRoute;
