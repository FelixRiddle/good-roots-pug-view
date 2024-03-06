import express from "express";
import { Sequelize } from "sequelize";

import { CategoryModel, PriceModel, PropertyModel } from "../mappings/models/index.js";
import expand from "../controllers/expand.js";

const searchRouter = express.Router();

searchRouter.post("/search", async (req, res) => {
    try {
        const { term } = req.body;
        
        // console.log(`Body: `, req.body);
        // console.log(`Term: `, term);
        
        if(!term.trim()) {
            return res.redirect("/back");
        }
        
        // Fetch properties
        const propertyModel = PropertyModel();
        const priceModel = PriceModel();
        const properties = await propertyModel.findAll({
            where: {
                title: {
                    [Sequelize.Op.like]: '%' + term + '%'
                    
                    // If you do it like this it will search at the start of the chain
                    // [Sequelize.Op.like]: term + '%'
                }
            },
            include: [
                { model: priceModel, as: 'price' }
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
        const catModel = CategoryModel();
        const categories = await catModel.findAll({
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
