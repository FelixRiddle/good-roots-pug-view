// Frontend authentication
const loginFormulary = async (req, res) => {
    return res.render("auth/login", {
        page: "Login",
        csrfToken: req.csrfToken()
    })
};

export default loginFormulary;
