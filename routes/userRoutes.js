import express from "express";
import {
    authenticate,
    forgotPasswordFormulary,
    registerFormulary,
    loginFormulary,
    verifyEmail,
    resetPassword,
    verifyToken,
    createNewPassword,
} from "../controllers/userController.js";
import register from "../controllers/user/register.js";

const router = express.Router();

// Hello
router.get("/login", loginFormulary);
router.post("/login", authenticate);

router.get("/register", registerFormulary);
router.post("/register", register);

router.get("/confirmEmail/:token", verifyEmail);

// Forgot password
router.get("/forgotPassword", forgotPasswordFormulary);
router.post("/forgotPassword", resetPassword);

router.get("/resetPassword/:token", verifyToken);
router.post("/resetPassword/:token", createNewPassword);

export default router;
