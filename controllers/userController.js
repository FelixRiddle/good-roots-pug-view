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

export {
    loginFormulary,
    registerFormulary
}
