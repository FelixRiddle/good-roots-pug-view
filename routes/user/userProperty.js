import express from "express";
import { body } from "express-validator";
import {
    admin,
    create,
    createProperty,
} from "../../controllers/propertyController.js";
import protectRoute from "../../middleware/protectRoute.js";
import setImage from "../../controllers/user/properties/setImage.js";
import upload from "../../middleware/updloadImage.js";
import storeImage from "../../controllers/user/properties/storeImage.js";

const router = express.Router();

// For endpoints that is obvious the user can't make a mistake
// (therefore are being manipulated)
let friendly_message = "You're 'bout to get banned champ";

// For the property location
let property_location = "Locate the property on the map";

router.get("/myProperties", (req, res) => {
    return res.redirect("/user/property/admin");
});
router.get("/admin", protectRoute, admin);
router.get("/create", protectRoute, create);
router.post("/create", protectRoute,
    body("title")
        .notEmpty().withMessage("The title is required")
        // Someone might be messing with endpoints so you always have to set a limit no matter what field is
        .isLength({
            max: 64
        }).withMessage("Title can't be longer than 64 characters"),
    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({
            max: 512,
        }).withMessage("Description is too large"),
    body("category")
        .isNumeric().withMessage("Select a category")
        .notEmpty().withMessage(friendly_message)
        .isLength({
            max: 16
        }).withMessage(friendly_message),
    body("price")
        .isNumeric().withMessage("Select a price")
        .notEmpty().withMessage(friendly_message)
        .isLength({
            max: 16
        }).withMessage(friendly_message),
    // These are all numbers
    body("rooms")
        .isNumeric().withMessage("Select rooms")
        .notEmpty().withMessage(friendly_message)
        .isLength({
            max: 16
        }).withMessage(friendly_message),
    body("parking")
        .isNumeric().withMessage("Select parking spots quantity")
        .notEmpty().withMessage(friendly_message)
        .isLength({
            max: 16
        }).withMessage(friendly_message),
    body("bathrooms")
        .isNumeric().withMessage("Select number of bathrooms")
        .notEmpty().withMessage(friendly_message)
        .isLength({
            max: 16
        }).withMessage(friendly_message),
    // Property location
    body("latitude")
        .notEmpty().withMessage(property_location),
    body("longitude")
        .notEmpty().withMessage(property_location),
    body("street")
        .notEmpty().withMessage(property_location),
    createProperty
);

// Set image
router.get(
    "/set-image/:id",
    protectRoute,
    setImage
);
router.post(
    "/set-image/:id",
    protectRoute,
    upload.single("image"),
    storeImage
);

export default router;
