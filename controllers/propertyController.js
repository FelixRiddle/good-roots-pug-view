import Category from "../models/Category.js";
import Price from "../models/Price.js";
import Property from "../models/Property.js";

// Control panel for user properties
const admin = async (req, res) => {
    
    const { id } = req.user;
    
    console.log(`ID: ${id}`);
    
    const properties = await Property.findAll({
        where: {
            id,
        }
    });
    
    return res.render("user/property/admin", {
        page: "My Properties",
        properties,
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
        categories,
        prices,
    });
}

export {
    admin,
    create,
}
