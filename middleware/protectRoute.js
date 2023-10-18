import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) =>  {
    
    // Check token
    // Get and rename token
    let { _token: token } = req.cookies;
    
    // If there's no token, send the user to the login page
    if(!token) {
        console.log("No token found");
        return res.redirect("/auth/login");
    }
    
    // Validate token
    try {
        // Verify user
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Validate user
        const user = await User.scope("deletePassword").findByPk(decoded.id);
        
        // Store user on the request
        if(user) {
            console.log(`User is Ok`);
            req.user = user;
        } else {
            console.log(`User not existent going back`);
            return res.redirect("/auth/login");
        }
        
        return next();
    } catch(err) {
        console.log(`Logging out the user`);
        return res.clearCookie("_token").redirect("/auth/login");
    }
}

export default protectRoute;
