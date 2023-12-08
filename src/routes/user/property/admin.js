import express from "express";

import Property from "../../../models/Property.js";

const adminRoutes = express.Router();

const admin = async(req, res) => {
    const { id } = req.user;
    console.log(`User ID: ${id}`);
    
    // Fetch properties from the database that are owned by this user
    const propertiesRes = await Property.findAll({
        where: {
            userId: id,
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
            }
        ]
    });
    
    // Thanks sensei for this incredible response
    // https://stackoverflow.com/questions/64546830/sequelize-how-to-eager-load-with-associations-raw-true
    const properties = propertiesRes.map(x => x.get({ plain: true }));
    
    return res.render("user/property/admin", {
        page: "My Properties",
        properties,
    });
}

// All of this go to the same page
adminRoutes.get("/myProperties", admin);
adminRoutes.get("/admin", admin);
adminRoutes.get("/index", admin);

export default adminRoutes;
