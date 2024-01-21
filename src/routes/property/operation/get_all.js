import express from "express";

import Property from "../../../models/Property.js";
import Price from "../../../models/Price.js";
import Category from "../../../models/Category.js";

const getAllRoutes = express.Router();

getAllRoutes.get("/get_all", async (req, res) => {
    try {
        const properties = await Property.findAll({
            where: {
                published: true,
            },
            include: [{
                raw: true,
                model: Price,
                as: "price"
            }, {
                raw: true,
                model: Category,
                as: "category"
            }]
        });
        
        return res.send({
            properties,
        });
    } catch(err) {
        console.error(err);
        return res.send({
            messages: [{
                message: "Unknown error",
                error: true,
            }]
        });
    }
});

export default getAllRoutes;
