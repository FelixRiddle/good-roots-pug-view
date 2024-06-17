import express from "express";

import { serverUrl } from "../../controllers/env/env.js";
import { isSeller as isUserSeller } from "../../lib/user/index.js";

const viewRoute = express.Router();

/**
 * View property by id
 */
viewRoute.get("/view/:id", async (req, res) => {
    try {
        console.log(`[GET] /property/view/${req.params.id}`);
        const { id } = req.params;
        
        const {
            Category,
            Property,
            Price
        } = req.models;
        
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
            const page404 = `${serverUrl()}/404`;
            return res.redirect(page404);
        }
        
        // The user may not exist
        const user = req.user;
        
        // Check if the user is the seller
        let isSeller = false;
        if(user) {
            isSeller = isUserSeller(user, property);
        }
        
        return res.render("property/view", {
            property,
            isSeller,
            user
        });
    } catch(err) {
        const home = `${serverUrl()}/home`;
        
        console.log(`Error when trying to view property`);
        console.error(err);
        console.log(`Redirect home`);
        return res.redirect(home);
    }
});

export default viewRoute;
