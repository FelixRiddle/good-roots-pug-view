import express from "express";

import Category from "../models/Category.js";
import Price from "../models/Price.js";
import Property from "../models/Property.js";

const categoryRouter = express.Router();

categoryRouter.get("/category/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Id: ${id}`);
        
        // Get these
        const category = await Category.findByPk(id);
        if(!category) {
            return res.redirect("/404");
        }
        
        // Obtain category properties
        const properties = await Property.findAll({
            where: {
                categoryId: id,
            },
            include: [
                { model: Price, as: 'price' }
            ]
        });
        
        return res.render("category", {
            page: "Category",
            category,
            properties,
        });
    } catch(err) {
        console.error(err);
    }
});

export default categoryRouter;
