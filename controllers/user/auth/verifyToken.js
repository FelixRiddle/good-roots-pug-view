import User from "../../../models/User.js";

const verifyToken = async (req, res) => {
    const { token } = req.params;
    
    const user = await User.findOne({
        where: {
            token,
        }
    });
    
    // If the user doesn't exists
    if(!user) {
        return res.render("auth/confirmAccount", {
            page: "Reset your password",
            message: "There was an error when trying to validate your account, please try again.",
            error: true,
        });
    }
    
    // Show formulary to modify the password
    return res.render("auth/resetPassword", {
        page: "Reset your password",
        csrfToken: req.csrfToken(),
    });
}

export default verifyToken;
