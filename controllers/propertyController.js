// Control panel for user properties
const admin = (req, res) => {
    return res.render("user/property/admin", {
        page: "My Properties",
        navbar: true,
    });
}

// Formulary to create a property
const create = (req, res) => {
    return res.render("user/property/create", {
        page: "Create property",
        navbar: true,
    });
}

export {
    admin,
    create,
}
