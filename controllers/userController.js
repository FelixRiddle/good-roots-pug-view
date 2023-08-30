const loginFormulary = (req, res) => {
    res.render("auth/login", {
        
    });
}

const registerFormulary = (req, res) => {
    res.render("auth/register", {
    });
}

export {
    loginFormulary,
    registerFormulary
}
