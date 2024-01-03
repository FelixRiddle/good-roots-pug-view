import multer from "multer";
import fs from "node:fs";

import propertyFolder from "./propertyFolder.js";
import propertyImagesConfiguration from "../../../../public/js/config/propertyImagesConfig.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { id } = req.params;
        
        // Obtain property path, and create if it doesn't not exist
        // This is an absolute path
        const propertyPath = propertyFolder(req.user.id, id);
        
        // Store image in the property path
        return cb(null, propertyPath);
    },
    filename: (req, file, cb) => {
        // The folder creation process is unique enough
        return cb(null, file.originalname);
    },
});

const uploadProperty = multer({
    storage,
    // Upload filter
    fileFilter: (req, file, cb) => {
        const { id } = req.params;
        
        // It's for each file
        // console.log(`Is this for each or all together?: `, file);
        
        const propertyPath = propertyFolder(req.user.id, id);
        
        // Bounce images that are over the limit
        const images = fs.readdirSync(propertyPath);
        // console.log(`Images: `, images);
        // console.log(`Images length: ${images.length}`);
        if(images.length >= propertyImagesConfiguration.maxImages) {
            // console.log(`Over the limit, bouncing...`);
            
            // Don't upload this image
            return cb(null, false);
        }
        
        // I can't believe this was set to false and was intervening with what I was doing
        return cb(null, true);
    }
});

export default uploadProperty;
