import jwt from "jsonwebtoken";
import { User } from "../models";

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
        const user = await User.findByPk(decoded.id);
        
    } catch(err) {
        return res.clearCookie("_token").redirect("/auth/login");
    }
    
    next();
}

export default protectRoute;
