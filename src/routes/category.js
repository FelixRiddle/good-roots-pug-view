import express from "express";

import { Category, Price, Property } from "app-models";

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
                { model: new Price(), as: 'price' }
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
