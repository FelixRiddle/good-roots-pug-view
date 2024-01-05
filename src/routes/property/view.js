import express from "express";

import Property from "../../models/Property.js";
import Category from "../../models/Category.js";
import Price from "../../models/Price.js";
import { serverUrl } from "../../controllers/env/env.js";

const viewRoute = express.Router();

viewRoute.get("/view/:id", async (req, res) => {
    const home = `${serverUrl()}/home`;
    const page404 = `${serverUrl()}/404`;
    
    try {
        const { id } = req.params;
        
        // Fetch property
        const property = await Property.findByPk(id, {
            include: [{
                raw: true,
                model: Category,
                as: "category"
            }, {
                raw: true,
                model: Price,
                as: "price"
            }]
        });
        console.log(`Property found`);
        // const property = propertyController.map(x => x.get({ plain: true }));
        
        console.log(`Property: `, property);
        
        // Check that the property exists
        if(!property) {
            console.log(`Property doesn't exists redirect to 404`);
            // return res.redirect(page404);
            return;
        }
        
        return res.render("property/view", {
            property,
        });
    } catch(err) {
        console.log(`Error when trying to view property`);
        console.error(err);
        console.log(`Redirect home`);
        // return res.redirect(home);
    }
});

export default viewRoute;
