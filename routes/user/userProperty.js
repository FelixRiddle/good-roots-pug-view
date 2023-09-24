import express from "express"

import {
    admin,
} from "../../controllers/propertyController.js";

const router = express.Router();

router.get("/admin", admin);

export default router;
