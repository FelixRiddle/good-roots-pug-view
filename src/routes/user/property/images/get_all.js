import express from "express";
import fs from "node:fs";

import userFolderMiddleware from "../../../../middleware/user/userFolderMiddleware.js";
import propertyFolder from "../../../../lib/user/userFolder/property/propertyFolder.js";

const getAllRouter = express.Router();

// Add an image to the property
getAllRouter.get("/get_all/:id", userFolderMiddleware, (req, res) => {
    const { id } = req.params;
    
    // Check if the image exists
    const propertyPath = propertyFolder(req.user.email, id);
    
    // Get images in the property folder
    const serverImages = fs.readdirSync(propertyPath);
    
    console.log(`Server images: `, serverImages);
    
    return res.send({
        images: serverImages,
    });
});

export default getAllRouter;
