import express from "express"

import {
    admin,
    create,
    createProperty,
} from "../../controllers/propertyController.js";

const router = express.Router();

router.get("/admin", admin);
router.get("/create", create);
router.post("/create", createProperty);

export default router;
