import express from "express";
import multer from "multer";

import Property from "../../../models/Property.js";
import expand from "../../../controllers/expand.js";

const setImageRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
        console.log("File information: ", file);
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return cb(null, uniqueSuffix + `-${file.originalname}`);
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

setImageRouter.post("/set_image/:id",
// userFolderExists,
upload.array("images"), async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Inserting the image on the server with id(property): ${id}`);
        
        // Validate that the property exists
        const property = await Property.findByPk(id);
        
        if(!property) {
            return res.redirect("/user/property/admin");
        }
        
        // Validate that the property is not published
        if(property.published) {
            return res.redirect("/user/property/admin");
        }
        
        // Validate that the property belongs to the own who made the request
        if(req.user) {
            if(req.user.id.to_string() !== property.ownerId.to_string()) {
                return res.redirect("/user/property/admin");
            }
        } else {
            console.log(`Req user doesn't exists`);
            return res.redirect("/user/property/admin");
        }
        
        // Store image
        property.image = req.file.filename;
        
        // Publish property
        property.published = 1;
        
        // Store
        await property.save();
        
        next();
    } catch(err) {
        console.error(err);
        return res.redirect("/user/property/admin");
    }
});

export default setImageRouter;
