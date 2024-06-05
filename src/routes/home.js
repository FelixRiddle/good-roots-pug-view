import express from "express";

import expand from "../controllers/expand.js"

const homeRouter = express.Router();

/**
 * Render home
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const renderHome = async (req, res) => {
    console.log(`GET /home`);
    
    try {
        const expanded = expand(req);
        const models = req.models;
        
        // Try to fetch properties
        try {
            console.log(`Finding categories prices, etc`);
            const [
                categoryModel, priceModel, propertyModel
            ] = [
                models.Category,
                models.Price,
                models.Property,
            ];
            
            const [categories, prices, properties] = await Promise.all([
                categoryModel.findAll({raw: true}),
                priceModel.findAll({raw: true}),
                propertyModel.findAll({
                    raw: true,
                    where: {
                        published: true,
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
                })
            ]);
            
            return res.render("home", {
                ...expanded,
                categories,
                prices,
                properties,
            });
        } catch(err) {
            console.error(err);
            
            // Otherwise just render the user
            return res.render("home", {
                ...expanded,
            });
        }
    } catch(err) {
        console.error(err);
        // If you can't even render home what do you even do?
        // Maybe just render home with no data
        return res.render("home");
    }
};

homeRouter.get("/feed", renderHome);
homeRouter.get("/home", renderHome);
homeRouter.get("/", renderHome);

export default homeRouter;
