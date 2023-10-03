import Category from "../models/Category.js";
import Price from "../models/Price.js";

// Control panel for user properties
const admin = (req, res) => {
    return res.render("user/property/admin", {
        page: "My Properties",
        navbar: true,
    });
}

// Formulary to create a property
const create = async (req, res) => {
    // Get price and category
    const [
        categories,
        prices,
    ] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
    ]);
    
    return res.render("user/property/create", {
        page: "Create property",
        navbar: true,
        categories,
        prices,
    });
}

const createProperty = async(req, res) => {
    
}

export {
    admin,
    create,
    createProperty,
}
