import express from "express";
import fs, { constants } from "node:fs";

import userFolderMiddleware from "../../../../middleware/user/userFolderMiddleware.js";
import { serverUrl } from "../../../../controllers/env/env.js";
import { relativePropertyFolder } from "../../../../lib/user/userFolder/property/propertyFolder.js";

const removeImageRouter = express.Router();

removeImageRouter.post("/remove_image/:id", userFolderMiddleware, async (req, res) => {
    let url = `${serverUrl()}/user/property/admin`;
    try {
        const { id } = req.params;
        
        const imagePublicPath = req.body.imageName;
        
        // The image name comes with its paths and everything
        // Even for security we want to cut it and just get the name
        const imageParts = imagePublicPath.split("/");
        const encodedImageName = imageParts[imageParts.length - 1];
        
        // We have to try to decode it first
        let imageName = "";
        try {
            imageName = decodeURI(encodedImageName);
        } catch(err) {
            console.log(`Couldn't decode the image name!!111!! 😡😡😨😰`);
            console.error(err);
            
            return res.send({
                messages: [{
                    message: "Couldn't decode the image name",
                    error: true,
                }]
            });
        }
        
        // Check if it exists
        try {
            // Get image path
            const propFolder = relativePropertyFolder(req.user.id, id);
            const imagePath = `${propFolder}/${imageName}`;
            
            // Check if file exists
            fs.accessSync(imagePath, constants.R_OK);
            
            // OK file exists
            fs.rmSync(imagePath);
        } catch(err) {
            console.log(`The file doesn't exist!`);
            
            // It doesn't exists
            return res.send({
                messages: [{
                    message: "The image you tried to delete doesn't exists",
                    error: true,
                }]
            });
        }
        
        return res.send({
            messages: [{
                message: "Image deleted",
                error: false,
            }]
        });
    } catch(err) {
        console.log(`Error: `);
        console.error(err);
        return res.redirect(url);
    }
});

export default removeImageRouter;
