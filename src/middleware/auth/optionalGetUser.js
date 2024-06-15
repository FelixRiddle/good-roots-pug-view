/**
 * Get user
 * 
 * Different from protectRoute, because in this middleware the user is optional.
 */
import { UserAPI } from "felixriddle.good-roots-ts-api";

const GET_USER_DEBUG = true;

/**
 * Get user optionally
 */
export default async function optionalGetUser(req, res, next) {
    // Validate token
    try {
        // Check token
        // Get and rename token
        let { _token: token } = req.cookies;
        
        if(token) {
            // Get user
            const userApi = await UserAPI.fromJWT(token);
            const user = await userApi.getUserData();
            
            // Store user on the request
            if(user) {
                req.user = user;
            } else {
                if(GET_USER_DEBUG) {
                    console.log(`Couldn't get the user`);
                }
            }
        } else {
            if(GET_USER_DEBUG) {
                console.log(`The token wasn't found!`);
            }
        }
    } catch(err) {
        if(GET_USER_DEBUG) {
            console.log(`Error when veryfing token`);
            console.error(err);
        }
    }
    
    // Regardless of whether the token was found or not
    return next();
}
