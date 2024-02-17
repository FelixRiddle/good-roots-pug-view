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
    fileFilter: async (req, file, cb) => {
        const { id } = req.params;
        console.log(`Trying to upload an image for the property with id: ${id}`);
        
        // It's for each file
        // console.log(`Is this for each or all together?: `, file);
        
        // Check types
        if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "application/octet-stream") {
            // Ok
        } else if(file.mimetype === "video/mp4") {
            // Ok
        } else {
            // Noooo, I don't like it.
            console.log(`Image format is not accepted by the server`);
            return cb(null, false);
        }
        
        // Check that the filesize isn't too large or too short
        const maxFileSize = propertyImagesConfiguration.maxSizeKb * 1024;
        const minFileSize = propertyImagesConfiguration.minSizeKb * 1024;
        const fileSize = parseInt(req.headers["content-length"]);
        if (fileSize <= minFileSize
                || fileSize >= maxFileSize) {
            console.log(`Given image is over the limit, or under minimum!1!!! 😠😡😤😤🤨🤨🚨🚨`);
            return cb(null, false);
        }
        
        const propertyPath = propertyFolder(req.user.id, id);
        
        // Bounce images that are over the limit
        const images = fs.readdirSync(propertyPath);
        if(images.length >= propertyImagesConfiguration.maxImages) {
            console.log(`Max images limit exceeded!`);
            // Don't upload this image
            return cb(null, false);
        }
        
        console.log(`Image uploaded!`);
        return cb(null, true);
    }
});

export default uploadProperty;
