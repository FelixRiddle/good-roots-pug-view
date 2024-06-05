import express from "express";

import expand from "../controllers/expand.js"

const categoryRouter = express.Router();

categoryRouter.get("/category/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Id: ${id}`);
        
        const models = req.models;
        const Category = models.Category;
        
        // Get these
        const category = await Category.findByPk(id);
        if(!category) {
            return res.redirect("/404");
        }
        
        // We only fetch after the previous check, to not waste resources
        const categories = await catModel.findAll({
            raw: true,
        });
        
        // Obtain category properties
        const properties = await PropertyModel().findAll({
            where: {
                categoryId: id,
            },
            include: [
                { model: PriceModel(), as: 'price' },
            ]
        });
        
        return res.render("category", {
            page: `${category.name} for sale`,
            category,
            categories,
            properties,
            ...expand(req)
        });
    } catch(err) {
        console.error(err);
    }
});

export default categoryRouter;
