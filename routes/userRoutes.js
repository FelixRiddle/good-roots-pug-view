import express from "express";
import {
    forgotPasswordFormulary,
    registerFormulary,
    register,
    loginFormulary,
    verifyEmail,
} from "../controllers/userController.js";

const router = express.Router();

// Hello
router.get("/login", loginFormulary);

router.get("/register", registerFormulary);
router.post("/register", register);

router.get("/confirmEmail/:token", verifyEmail);

router.get("/forgotPassword", forgotPasswordFormulary);

export default router;
