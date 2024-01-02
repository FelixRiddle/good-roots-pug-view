import express from "express";

import userFolderMiddleware from "../../../../middleware/user/userFolderMiddleware.js";
import { relativePropertyImages } from "../../../../lib/user/userFolder/property/propertyFolder.js";

const getAllRouter = express.Router();

// Add an image to the property
getAllRouter.get("/get_all/:id", userFolderMiddleware, (req, res) => {
    try {
        const { id } = req.params;
        
        let relPropImgs = relativePropertyImages(req.user.id, id);
        
        return res.send({
            images: relPropImgs,
        });
    } catch(err) {
        console.error(err);
        
        // Send nothing back
        return res.send({
            images: []
        })
    }
});

export default getAllRouter;
