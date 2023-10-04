import express from "express";
import { body } from "express-validator";
import {
    admin,
    create,
    createProperty,
} from "../../controllers/propertyController.js";

const router = express.Router();

// For endpoints that is obvious the user can't make a mistake
// (therefore are being manipulated)
let friendly_message = "You're 'bout to get banned champ";

// For the property location
let property_location = "Locate the property on the map";

router.get("/admin", admin);
router.get("/create", create);
router.post(
    "/create",
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

export default router;
