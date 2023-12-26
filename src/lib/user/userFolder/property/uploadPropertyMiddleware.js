import { constants } from "node:buffer";
import path from "node:path";
import fs from "node:fs";

import multer from "multer";

import propertyFolder from "./propertyFolder.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { id } = req.params;
        console.log(`File: `, file);
        
        // Obtain property path, and create if it doesn't not exist
        // This is an absolute path
        const propertyPath = propertyFolder(req.user.email, id);
        
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
    fileFilter: (req, file, cb) => {
        console.log(`File filter`);
        const { id } = req.params;
        console.log(`File: `, file);
        
        // Check if the image exists
        const propertyPath = propertyFolder(req.user.email, id);
        // const imagePath = 
        try {
            console.log(`The image exists`);
            fs.accessSync(propertyPath, constants.F_OK);
        } catch(err) {
            // The image doesn't exists
            console.log(`The image doesn't exists`);
        }
        
        return cb(null, false);
    }
});

export default uploadProperty;
