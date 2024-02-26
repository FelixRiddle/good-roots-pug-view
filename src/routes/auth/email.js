import express from "express";

// import { User } from "express-authentication";

// import { serverUrl } from "../../controllers/env/env.js";

const emailRouter = express.Router();

// /**
//  * Email validation
//  */
// emailRouter.get("/email/:token", async(req, res) => {
//     const home = `${serverUrl()}/home`;
//     console.log(`GET /auth/email/:token`);
    
//     try {
//         // Get the token
//         const { token } = req.params;
        
//         // Verify if the token is correct
//         const user = await User.findOne({
//             where: {
//                 token,
//             },
//         });
//         if(!user) {
//             console.log(`Couldn't confirm the E-Mail, because the user doesn't exists!`)
//             return res.redirect(home);
//         }
        
//         // Confirm account
//         if(user.token == token) {
//             user.token = "";
//             user.confirmedEmail = true;
            
//             await user.save();
//         } else {
//             console.log(`Couldn't confirm the E-Mail, tokens don't match!`);
//             return res.redirect(home);
//         }
        
//         console.log(`Email confirmed!`);
//         return res.redirect(home);
//     } catch(err) {
//         console.log(`Error when confirming the email.`);
//         console.error(err);
//         return res.redirect(home);
//     }
// });

export default emailRouter;
