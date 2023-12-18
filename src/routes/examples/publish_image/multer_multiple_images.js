// Simple example
import express from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/test");
    },
    filename: (req, file, cb) => {
        console.log("File information: ", file);
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + `-${file.originalname}`);
    }
});
const upload = multer({
    storage,
});

import expand from "../../../controllers/expand.js";

const multerMultipleImages = express.Router();

multerMultipleImages.get("/multer_multiple_images", (req, res) => {
    return res.render("examples/publish_image/multer_multiple_images", {
        page: "Multer example",
        ...expand(req),
    });
});

multerMultipleImages.post("/multer_multiple_images", upload.array("images"), (req, res) => {
    console.log("Files uploaded, files: ");
    console.log(req.files);
    console.log(`Body: `, req.body);
});

export default multerMultipleImages;
