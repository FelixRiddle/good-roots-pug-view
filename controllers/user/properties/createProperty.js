import { validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

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
        
        const { id: ownerId } = req.user;
        console.log(`Owner id: `, ownerId);
        
        // Store data
        const property = Property.create({
            // id(The uuid is generated automatically by the database)
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            image: "",
            published: false,
            ownerId,
            priceId,
            categoryId,
        });
        // id(uuid),
        // title,
        // description,
        // rooms,
        // parking,
        // bathrooms,
        // street,
        // latitude,
        // longitude,
        // image,
        // published,
        // ownerId,
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
