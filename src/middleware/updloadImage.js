import multer from "multer";
import path from "path";

import { generateId } from "../helpers/tokens.js";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(`Destination done`);
        
        return cb(null, "./public/uploads/");
    },
    filename: function(req, file, cb) {
        let filename = generateId() + path.extname(file.originalName);
        console.log(`Filename: ${filename}`);
        return cb(null, filename);
    }
});

const upload = multer({
    storage
});

export default upload;
