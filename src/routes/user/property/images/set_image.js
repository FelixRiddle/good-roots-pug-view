import express from "express";

import uploadProperty from "../../../../lib/user/userFolder/property/uploadPropertyMiddleware.js";
import userFolderMiddleware from "../../../../middleware/user/userFolderMiddleware.js";
import { serverUrl } from "../../../../controllers/env/env.js";

const setImageRouter = express.Router();

setImageRouter.post("/set_image/:id", userFolderMiddleware, uploadProperty.array("images"), async (req, res) => {
    let url = `${serverUrl()}/user/property/admin`;
    
    try {
        // The property and the user is already validated at the middleware
        const { id } = req.params;
        
        console.log(`[POST] /user/property/images/set_image/${id}`);
        
        // All of these checks are kinda useless, because the upload happened before this.
        // maybe just to inform the user?
        
        // Check if there were even files given
        if(!req.files) {
            console.warn(`Not even files were given!`);
            return res.send({
                messages: [{
                    message: "No images given for the property(1)",
                    error: true,
                }]
            });
        }
        
        const {
            Property,
        } = req.models;
        
        // Validate that the property exists
        const property = await Property.findByPk(id);
        if(!property) {
            console.warn(`Property doesn't exists!!!11`);
            return res.send({
                messages: [{
                    message: "Property doesn't exists.",
                    error: true,
                }]
            });
        }
        
        return res.send({
            messages: [{
                message: "Images updated!!!11",
                error: false,
            }],
        });
    } catch(err) {
        console.log(`Error: `);
        console.error(err);
        return res.redirect(url);
    }
});

export default setImageRouter;
