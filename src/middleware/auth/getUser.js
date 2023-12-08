/**
 * Get user
 * 
 * But if not user is found, it will let the user still access the requested page
 */
import jwt from "jsonwebtoken";

import User from "../../models/User.js";

// Get user
const getUser = async (req, res, next) =>  {
    // Validate token
    try {
        // Check token
        // Get and rename token
        let { _token: token } = req.cookies;
        
        if(token) {
            // Verify user
            let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            // Validate user
            const user = await User.scope("deletePassword").findByPk(decoded.id);
            
            // Store user on the request
            if(user) {
                req.user = user;
            }
        }
        
    } catch(err) {
        console.error(err);
    }
    
    return next();
}

export default getUser;
