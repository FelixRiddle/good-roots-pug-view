// Simple example
import express from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`Saving file`);
        console.log(`Ok, saving file '${file.originalname}' at 'public/img/test'.`);
        
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

const dropzoneRouter = express.Router();

dropzoneRouter.get("/dropzone", (req, res) => {
    return res.render("examples/publish_image/dropzone", {
        page: "Dropzone",
        ...expand(req),
    });
});

dropzoneRouter.post("/dropzone", upload.array("images"), (req, res) => {
    console.log("Files uploaded, files: ");
    console.log(req.files);
});

export default dropzoneRouter;
