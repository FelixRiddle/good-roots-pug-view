import multer from "multer";

import propertyFolder from "./propertyFolder.js";

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
    fileFilter: (req, file, cb) => {
        // const { id } = req.params;
        
        // Unnecessary, just replace previous files with the default configuration
        
        // // Check if the image exists
        // const propertyPath = propertyFolder(req.user.id, id);
        // try {
        //     fs.accessSync(propertyPath, constants.F_OK);
        // } catch(err) {
        //     // The image doesn't exists
        // }
        
        // I can't believe this was set to false and was intervening with what I was doing
        return cb(null, true);
    }
});

export default uploadProperty;
