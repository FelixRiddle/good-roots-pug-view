const loginFormulary = (req, res) => {
    res.render("auth/login", {
        page: "Login"
    });
}

const registerFormulary = (req, res) => {
    res.render("auth/register", {
        page: "Register"
    });
}

const forgotPasswordFormulary = (req, res) => {
    res.render("auth/forgotPassword", {
        page: "Forgot password"
    });
}

export {
    loginFormulary,
    registerFormulary,
    forgotPasswordFormulary
}
