
// Render the register formulary
const registerFormulary = (req, res) => {
    return res.render("auth/register", {
        page: "Register",
        csrfToken: req.csrfToken(),
    });
};

export default registerFormulary;
