import express from "express";
import { Sequelize } from "sequelize";

import expand from "../controllers/expand.js";

const searchRouter = express.Router();

searchRouter.post("/search", async (req, res) => {
    try {
        const { term } = req.body;
        
        if(!term.trim()) {
            return res.redirect("/back");
        }
        
        const Property = req.models.Property;
        const Price = req.models.Price;
        
        // Fetch properties
        const properties = await Property.findAll({
            where: {
                title: {
                    [Sequelize.Op.like]: '%' + term + '%'
                    
                    // If you do it like this it will search at the start of the chain
                    // [Sequelize.Op.like]: term + '%'
                }
            },
            include: [
                { model: Price, as: 'price' }
            ],
            raw: true,
        });
        
        // console.log(`Properties: `, properties);
        const expanded = expand(req);
        
        // Get these
        if(!properties || properties.length === 0) {
            return res.send({
                messages: [{
                    error: true,
                    message: "Property not found"
                }],
                ...expanded,
            });
        }
        
        // We only fetch after the previous check, to not waste resources
        const Category = req.models.Category;
        const categories = await Category.findAll({
            raw: true,
        });
        
        return res.render("search", {
            page: "Search results",
            properties,
            categories,
            ...expanded,
        });
    } catch(err) {
        console.error(err);
        return res.send({
            
        });
    }
});

export default searchRouter;
