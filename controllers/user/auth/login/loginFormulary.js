// Frontend authentication
const loginFormulary = async (req, res) => {
    // Print csrf token
    if(req.body) {
        if(req.body.csrfToken) {
            console.log(`Csrf token: ${req.body.csrfToken}`)
        }
    }
    
    return res.render("auth/login", {
        page: `Login`,
    });
};

export default loginFormulary;
