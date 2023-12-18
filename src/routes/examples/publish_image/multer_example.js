import express from "express";
import multer from "multer";

const upload = multer({ dest: "public/img/test" });

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
    console.log(`Content type: ${req.headers["content-type"]}`);
});

export default multerExampleRouter;
