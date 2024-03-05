import express from "express";

// import { Category, Price, Property } from "app-models";
// F, I forgot ecs doesn't let you import without the file extension
import { CategoryModel, PriceModel, PropertyModel } from "../mappings/models/index.js";

const categoryRouter = express.Router();

categoryRouter.get("/category/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Id: ${id}`);
        
        // Get these
        const catModel = CategoryModel();
        const category = await catModel.findByPk(id);
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
        });
    } catch(err) {
        console.error(err);
    }
});

export default categoryRouter;
