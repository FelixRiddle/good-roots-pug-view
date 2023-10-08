import { validationResult } from "express-validator";

import Category from "../models/Category.js";
import Price from "../models/Price.js";
import Property from "../models/Proerty.js";

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
        csrfToken: req.csrfToken(),
        categories,
        prices,
    });
}

const createProperty = async(req, res) => {
    // Validation
    let result = validationResult(req);
    
    if(!result.isEmpty()) {
        // Get price and category
        const [
            categories,
            prices,
        ] = await Promise.all([
            Category.findAll(),
            Price.findAll(),
        ]);
        
        return res.render(
            "user/property/create", {
            page: "Create property",
            navbar: true,
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errors: result.array(),
            property: req.body,
        });
    }
    
    // Insert on the database
    try {
        // Extract data
        const {
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            price: priceId,
            category: categoryId,
        } = req.body;
        
        // Store data
        const property = Property.create({
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            priceId,
            categoryId,
        });
        
    } catch(err) {
        console.error(err);
    }
}

export {
    admin,
    create,
    createProperty,
}
