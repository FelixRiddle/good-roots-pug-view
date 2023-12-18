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

const multerExampleRouter = express.Router();

multerExampleRouter.get("/multer_example", (req, res) => {
    return res.render("examples/publish_image/multer_example", {
        page: "Multer example",
        ...expand(req),
    });
});

multerExampleRouter.post("/multer_example", upload.single("avatar"), (req, res) => {
    console.log("File uploaded, file: ");
    console.log(req.file);
});

export default multerExampleRouter;
