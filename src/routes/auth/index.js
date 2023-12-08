import express from "express";

import emailRouter from "./email.js";
import loginRouter from "./login.js";
import logoutRouter from "./logout.js";
import registerRouter from "./register.js";
import passwordRouter from "./password/index.js";

const authRoutes = express.Router();

// Insert other routers
authRoutes.use(emailRouter);
authRoutes.use(loginRouter);
authRoutes.use(logoutRouter);
authRoutes.use(passwordRouter)
authRoutes.use(registerRouter)

export default authRoutes;
