import User from "../../../../models/User.js";

// Verify that the email is correct
const verifyEmail = async(req, res) => {
    
    // Get the token
    const { token } = req.params;
    
    // Verify if the token is correct
    const user = await User.findOne({
        where: {
            token,
        },
    });
    if(!user) {
        return res.render("auth/confirmAccount", {
            page: "Error when confirming account",
            message: "User non existent or incorrect token",
            error: true,
        });
    }
    
    // Confirm account
    if(user.token == token) {
        user.token = "";
        user.confirmedEmail = true;
        
        await user.save();
    }
    
    return res.render("auth/confirmAccount", {
        page: "Email confirmed",
        message: "The user email has been confirmed"
    });
};

export default verifyEmail;
