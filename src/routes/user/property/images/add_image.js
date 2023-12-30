import express from "express";

import uploadProperty from "../../../../lib/user/userFolder/property/uploadPropertyMiddleware.js";
import userFolderMiddleware from "../../../../middleware/user/userFolderMiddleware.js";

const addImageRouter = express.Router();

// Add an image to the property
addImageRouter.post("/add_image/:id", userFolderMiddleware, uploadProperty.array("images"), (req, res) => {
    // 
});

export default addImageRouter;
