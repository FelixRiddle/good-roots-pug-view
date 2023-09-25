import express from "express"

import {
    admin,
    create,
} from "../../controllers/propertyController.js";

const router = express.Router();

router.get("/admin", admin);
router.get("/create", create);

export default router;
