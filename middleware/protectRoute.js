import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) =>  {
    
    // Check token
    // Get and rename token
    let { _token: token } = req.cookies;
    
    // If there's no token, send the user to the login page
    if(!token) {
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
            req.user = user;
        } else {
            return res.redirect("/auth/login");
        }
        
        return next();
    } catch(err) {
        return res.clearCookie("_token").redirect("/auth/login");
    }
}

export default protectRoute;
