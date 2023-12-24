import multer from "multer";

import propertyFolder from "./propertyFolder.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { id } = req.params;
        
        // Obtain property path, and create if it doesn't not exist
        // This is an absolute path
        const propertyPath = propertyFolder(req.user.email, id);
        
        // Store image in the property path
        return cb(null, propertyPath);
    },
    filename: (req, file, cb) => {
        // The folder creation process is unique enough
        return cb(null, file.originalname);
    }
});

const uploadProperty = multer({
    storage
});

export default uploadProperty;
