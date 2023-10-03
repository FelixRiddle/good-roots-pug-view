import express from "express";
import { body } from "express-validator";
import {
    admin,
    create,
    createProperty,
} from "../../controllers/propertyController.js";

const router = express.Router();

router.get("/admin", admin);
router.get("/create", create);
router.post(
    "/create",
    body("title").notEmpty().withMessage("The title is required"),
    createProperty
);

export default router;
