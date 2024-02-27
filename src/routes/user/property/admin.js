import express from "express";

import {
    Category,
    Price,
    Property,
} from "app-models";

import expand from "../../../controllers/expand.js";
import { relativePropertyImages } from "../../../lib/user/userFolder/property/propertyFolder.js";

const adminRoutes = express.Router();

const admin = async(req, res) => {
    try {
        // Query parameters
        const { page } = req.query;
        const pageExpression = /^[0-9]$/;
        
        // Check that validation passes
        if(!pageExpression.test(page)) {
            // Show the first page then
            console.log(`Didn't pass expression validation, redirecting to first page!`);
            return res.redirect(`/user/property/admin?page=1`);
        }
        
        // User data
        const { id: userId } = req.user;
        
        // Limit and skips
        const limit = 10;
        const skip = ((page * limit) - limit);
        
        // Fetch properties from the database that are owned by this user
        const propModel = new Property();
        const categoryModel = new Category();
        const priceModel = new Price();
        const [propertiesRes, total] = await Promise.all([
            propModel.findAll({
                limit,
                offset: skip,
                where: {
                    userId,
                },
                include: [
                    {
                        raw: true,
                        model: categoryModel,
                        as: 'category'
                    }, {
                        raw: true,
                        model: priceModel,
                        as: "price"
                    }
                ]
            }),
            // Get the quantity of user properties
            propModel.count({
                where: {
                    userId,
                },
            })
        ]);
        
        // Thanks sensei for this incredible response
        // https://stackoverflow.com/questions/64546830/sequelize-how-to-eager-load-with-associations-raw-true
        const properties = propertiesRes.map(x => x.get({ plain: true }));
        
        try {
            // Get property images
            for(let property of properties) {
                // Get the property images relative to the public path
                let propertyImages = relativePropertyImages(userId, property.id);
                
                property.imagesRelativeURI = propertyImages;
            }
        } catch(err) {
            // console.log(`Error:`)
            // console.error(err);
            // console.log(`The property folder for the user may not exist!`);
            // console.log(`This just means that the user doesn't have any properties`);
        }
        
        let expanded = expand(req);
        return res.render("user/property/admin", {
            page: "My Properties",
            properties,
            // Total pages
            pages: Math.ceil(total / limit),
            // Other
            currentPage: Number(page),
            total,
            offset: skip,
            limit,
            ...expanded,
        });
    } catch(err) {
        console.error(err);
        return res.redirect("/home");
    }
}

// All of this go to the same page
adminRoutes.get("/myProperties", admin);
adminRoutes.get("/admin", admin);
adminRoutes.get("/index", admin);

export default adminRoutes;
