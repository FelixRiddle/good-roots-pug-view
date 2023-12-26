import express from "express";

import addImageRouter from "./add_image.js";
import userFolderMiddleware from "../../../../middleware/user/userFolderMiddleware.js";

const imagesRouter = express.Router();

// Use middleware
// The id will be in the middle, so that only if the property exists
// can a user access these endpoints.
// imagesRouter.use("/:id", (req, res, next) => next())
imagesRouter.use("/:id", userFolderMiddleware);

imagesRouter.use(addImageRouter);
imagesRouter.get("/get", (req, res) => {
    console.log("Get request");
    return res.send({
        message: "Request ok"
    });
});

export default imagesRouter;
