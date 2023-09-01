import express from "express";
import {
    forgotPasswordFormulary,
    loginFormulary,
    registerFormulary
} from "../controllers/userController.js";

const router = express.Router();

// Hello
router.get("/login", loginFormulary);
router.get("/register", registerFormulary);
router.get("/forgotPassword", forgotPasswordFormulary);

export default router;
