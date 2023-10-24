
// Forgot password
const forgotPasswordFormulary = async (req, res) => {
    return res.render("auth/forgotPassword", {
        page: "Recover access to your account",
        csrfToken: req.csrfToken(),
    });
};

export default forgotPasswordFormulary;
