import express from "express";

import expand from "../../../controllers/expand.js";
import { relativePropertyImages } from "../../../lib/user/userFolder/property/propertyFolder.js";
import GeneralPropertyInformation from "../../../lib/model/GeneralPropertyInformation.js";

const adminRoutes = express.Router();

const admin = async(req, res) => {
    try {
        // Query parameters
        let { page } = req.query;
        const isNumberExpression = /^[0-9]$/;
        
        console.log(`Page: `, page);
        console.log(`Page is number: `, isNumberExpression.test(page));
        
        if(page) {
            // Check that validation passes
            if(!isNumberExpression.test(page)) {
                // Show the first page then
                console.log(`Didn't pass expression validation, redirecting to first page!`);
                return res.redirect(`/user/property/admin?page=1`);
            }
        } else {
            page = 1;
        }
        
        console.log(`[GET] /user/property/admin?page=${page}`);
        
        // User data
        const { id: userId } = req.user;
        
        // Limit and skips
        const limit = 10;
        const skip = ((page * limit) - limit);
        
        const {
            Category,
            Price,
            Property,
            PropertySellerMessages,
        } = req.models;
        
        // Fetch properties from the database that are owned by this user
        const [propertiesRes, total] = await Promise.all([
            Property.findAll({
                limit,
                offset: skip,
                where: {
                    userId,
                },
                include: [
                    {
                        raw: true,
                        model: Category,
                        as: 'category'
                    }, {
                        raw: true,
                        model: Price,
                        as: "price"
                    },
                ]
            }),
            // Get the quantity of user properties
            Property.count({
                where: {
                    userId,
                },
            })
        ]);
        
        // Append how many messages each property has received
        for(const prop of propertiesRes) {
            console.log(`Property: `, prop);
            const propertyId = prop.id;
            
            const genInfoProp = new GeneralPropertyInformation(req.models, propertyId);
            const messagesCount = genInfoProp.countPrivateMessages();
            
            console.log(`Id: ${propertyId}, messages count: ${messagesCount}`);
            
            prop.messagesCount = messagesCount;
        }
        
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
            console.log(`The property folder for the user may not exist!`);
            console.log(`This just means that the user doesn't have any properties`);
        }
        
        const expanded = expand(req);
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
