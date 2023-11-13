import { validationResult } from "express-validator";

import Category from "../models/Category.js";
import Price from "../models/Price.js";
import Property from "../models/Property.js";

// Control panel for user properties
const admin = (req, res) => {
    return res.render("user/property/admin", {
        page: "My Properties",
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
        
        const { id: userId } = req.user;
        
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
            userId,
            image: "",
        });
        
        let id = property.id;
        
        return res.redirect(`/user/property/set-image/${id}`);
    } catch(err) {
        console.error(err);
    }
    
    return res.render("/user/profile");
}

export {
    admin,
    create,
    createProperty,
}
