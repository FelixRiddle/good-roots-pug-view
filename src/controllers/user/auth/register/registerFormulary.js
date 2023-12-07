
// Render the register formulary
const registerFormulary = (req, res) => {
    // Print csrf token
    if(req.body) {
        if(req.body.csrfToken) {
            console.log(`Csrf token: ${req.body.csrfToken}`)
        }
    }
    
    return res.render("auth/register", {
        page: "Register",
        csrfToken: req.csrfToken(),
    });
};

export default registerFormulary;
