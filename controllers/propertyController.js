const admin = (req, res) => {
    return res.render("user/admin", {
        page: "My Properties"
    });
}

export {
    admin,
}
