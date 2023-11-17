import { validationResult } from "express-validator";

import Property from "../../../models/Property.js";

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
            published: false,
            image: "",
        });
        let id = property.id;
        
        console.log(`Success the user will be going to set the image`);
        return res.redirect(`/user/property/set-image/${id}`);
    } catch(err) {
        console.log(`Error detected, the user will be redirected to its profile`);
        console.error(err);
    }
    
    return res.render("/user/profile");
}

export default createProperty;
