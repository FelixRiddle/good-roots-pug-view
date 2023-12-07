// Frontend authentication
const loginFormulary = async (req, res) => {
    console.log(`User`);
    console.log(req.user);
    
    return res.render("auth/login", {
        page: `Login`,
        user: req.user,
    });
};

export default loginFormulary;
