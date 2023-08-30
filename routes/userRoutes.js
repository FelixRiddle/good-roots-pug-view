import express from "express";
import {
    loginFormulary,
    registerFormulary
} from "../controllers/userController.js";

const router = express.Router();

// Hello
router.route("/login")
    .get(loginFormulary);

router.route("/register")
    .get(registerFormulary);
    
export default router;
