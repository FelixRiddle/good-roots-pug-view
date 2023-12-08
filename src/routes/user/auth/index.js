import express from "express";

import loginRouter from "./login.js";
import registerRouter from "./register.js";
import passwordRouter from "./password/index.js";

const authRoutes = express.Router();

// Insert other routers
authRoutes.use("/login", loginRouter);
authRoutes.use("/password", passwordRouter)
authRoutes.use("/register", registerRouter)

export default authRoutes;
