import express from "express";
import {
    authenticate,
    forgotPasswordFormulary,
    loginFormulary,
    resetPassword,
    verifyToken,
    createNewPassword,
} from "../controllers/userController.js";
import register from "../controllers/user/auth/register/register.js";
import registerFormulary from "../controllers/user/auth/register/registerFormulary.js";
import verifyEmail from "../controllers/user/auth/email/verifyEmail.js";

const router = express.Router();

// --- Auth ---
// Register
router.get("/register", registerFormulary);
router.post("/register", register);

// Login
router.get("/login", loginFormulary);
router.post("/login", authenticate);

// Email
router.get("/confirmEmail/:token", verifyEmail);

// Forgot password
router.get("/forgotPassword", forgotPasswordFormulary);
router.post("/forgotPassword", resetPassword);

router.get("/resetPassword/:token", verifyToken);
router.post("/resetPassword/:token", createNewPassword);

export default router;
