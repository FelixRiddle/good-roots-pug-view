
// Forgot password
const forgotPasswordFormulary = async (req, res) => {
    // Print csrf token
    if(req.body) {
        if(req.body.csrfToken) {
            console.log(`Csrf token: ${req.body.csrfToken}`)
        }
    }
    
    return res.render("auth/forgotPassword", {
        page: "Recover access to your account",
        csrfToken: req.csrfToken(),
    });
};

export default forgotPasswordFormulary;
