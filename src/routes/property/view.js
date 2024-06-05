import express from "express";

import expand from "../../controllers/expand.js";
import { serverUrl } from "../../controllers/env/env.js";

const viewRoute = express.Router();

/**
 * View property by id
 */
viewRoute.get("/view/:id", async (req, res) => {
    try {
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
        
        // Check if the user is the seller
        const userId = req.user?.id;
        console.log(`User id: ${userId}`);
        console.log(`Property user: ${property.userId}`);
        
        const isSeller = userId === property.userId;
        console.log(`The person in the seller: ${isSeller}`);
        
        return res.render("property/view", {
            property,
            isSeller,
            ...expand(req)
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
