import express from "express";
import multer from "multer";

import Property from "../../../models/Property.js";
import expand from "../../../controllers/expand.js";
import userFolderMiddleware from "../../../middleware/user/userFolderMiddleware.js";
import propertyFolder from "../../../lib/user/userFolder/property/propertyFolder.js";

const setImageRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { id } = req.params;
        
        // Obtain property path, and create if it doesn't not exist
        const propertyPath = propertyFolder(req.user.email, id);
        
        // Store image in the property path
        return cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
        console.log("File information: ", file);
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // return cb(null, uniqueSuffix + `-${file.originalname}`);
        
        // The folder creation process is unique enough
        return cb(null, file.originalname);
    }
});

const upload = multer({
    storage
});

// Set image
// I just remembered, id doesn't work here
// We have to remove the hyphens from it.
setImageRouter.get("/set_image/:id", async (req, res) => {
    try {
        console.log(`At set_image`);
        
        const { id } = req.params;
        let user = req.user.dataValues;
        
        console.log(`Property id: ${id}`);
        
        // Validate that the property exists
        const propertyController = await Property.findByPk(id);
        
        if(!propertyController) {
            console.log(`The requested property doesn't exists!`);
            return res.redirect("user/property/admin");
        }
        
        // Validate that the property is not published
        if(propertyController.published) {
            console.log(`This property has already been published`);
            return res.redirect("user/property/admin");
        }
        
        // Validate that the property belongs to the own who made the request
        if(user) {
            if(user.id.toString() !== propertyController.userId.toString()) {
                console.log(`The user doesn't own this property going back...`);
                console.log(`User: `, req.user.name);
                return res.redirect("user/property/admin");
            }
        } else {
            console.log(`Req user doesn't exists`);
            return res.redirect("user/property/admin");
        }
        
        // Remove sequelize stuff and leave just the data
        let property = propertyController.get({ plain: true });
        
        // Ok, render the page to set the image
        let nextUrl = `user/property/set_image`;
        console.log(`All validations ok`);
        console.log(`Rendering: ${nextUrl}`);
        return res.render(
            nextUrl, {
            page: `Set images for ${property.title}`,
            property,
            ...expand(req),
        });
    } catch(err) {
        console.log(err);
        console.log(`Error: `, err);
        console.log(`Couldn't render /set_image`);
        return res.redirect("user/property/admin");
    }
});

setImageRouter.post("/set_image/:id", userFolderMiddleware, upload.array("images"), async (req, res) => {
    try {
        // --- This should be in a middleware ---
        // The property and the user is already validated at the middleware
        const { id } = req.params;
        console.log(`Inserting the image on the server with id(property): ${id}`);
        
        // It just is missing this part
        // Validate that the property exists
        const property = await Property.findByPk(id);
        // --------------------------------------
        
        // Validate that the property is not published
        console.log(`Property published: ${property.published}`);
        if(!property.published) {
            return res.redirect("user/property/admin");
        }
        
        // Name of the first image file
        property.image = req.files[0].filename;
        
        // Publish property
        property.published = 1;
        
        // Store
        await property.save();
        
        return res.redirect("user/property/admin", {
            messages: [{
                message: "Images uploaded",
                error: false,
            }]
        });
    } catch(err) {
        console.error(err);
        return res.redirect("user/property/admin");
    }
});

export default setImageRouter;
