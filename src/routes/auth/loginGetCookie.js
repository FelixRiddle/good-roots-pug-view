/**
 * Login get cookie
 * 
 * A specific endpoint for testing the log in behaviour, you just get the cookie directly instead of a whole page.
 * Maybe it would be easier if I just don't redirect the user from the backend when they log in? 😂
 */
import axios from "axios";

const loginGetCookieRouter = axios.Router();

loginGetCookieRouter.post("/login_get_cookie", async(req, res) => {
    
});

export default loginGetCookieRouter;
