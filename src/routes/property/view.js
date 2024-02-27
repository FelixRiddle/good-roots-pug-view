import express from "express";

import {
    Property,
    Category,
    Price,
} from "app-models";

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
        
        // Check that the property exists
        if(!property) {
            console.log(`Property doesn't exists redirect to 404`);
            return res.redirect(page404);
        }
        
        return res.render("property/view", {
            property,
        });
    } catch(err) {
        console.log(`Error when trying to view property`);
        console.error(err);
        console.log(`Redirect home`);
        return res.redirect(home);
    }
});

export default viewRoute;
