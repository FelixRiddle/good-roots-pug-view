import express from "express";
import fs from "node:fs";

import userFolderMiddleware from "../../../../middleware/user/userFolderMiddleware.js";
import propertyFolder, { relativePropertyImages } from "../../../../lib/user/userFolder/property/propertyFolder.js";

const getAllRouter = express.Router();

// Add an image to the property
getAllRouter.get("/get_all/:id", userFolderMiddleware, (req, res) => {
    const { id } = req.params;
    
    // Check if the image exists
    const propertyPath = propertyFolder(req.user.id, id);
    
    // Get images in the property folder
    const serverImages = fs.readdirSync(propertyPath);
    
    let relPropImgs = relativePropertyImages(req.user.id, id);
    
    console.log(`Server images: `, serverImages);
    console.log(`\nPublic property images: `, relPropImgs);
    
    return res.send({
        images: relPropImgs,
    });
});

export default getAllRouter;
