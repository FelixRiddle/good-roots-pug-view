import express from "express";

import userFolderMiddleware from "../../../../middleware/user/userFolderMiddleware.js";

const addImageRouter = express.Router();

addImageRouter.use("/add_image", userFolderMiddleware, upload.array("images"), (req, res) => {
    
});

export default addImageRouter;
