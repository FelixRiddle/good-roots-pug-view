import express from "express";

// Formularies
import registerFormulary from "../controllers/user/auth/register/registerFormulary.js";
import loginFormulary from "../controllers/user/auth/login/loginFormulary.js";
import forgotPasswordFormulary from "../controllers/user/auth/password/forgotPasswordFormulary.js";

// Endpoints
import register from "../controllers/user/auth/register/register.js";
import verifyEmail from "../controllers/user/auth/email/verifyEmail.js";
import authenticate from "../controllers/user/auth/authenticate.js";
import verifyToken from "../controllers/user/auth/verifyToken.js";
import createNewPassword from "../controllers/user/auth/password/createNewPassword.js";
import resetPassword from "../controllers/user/auth/password/resetPassword.js";

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
