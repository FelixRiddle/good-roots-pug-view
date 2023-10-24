import cookieParser from 'cookie-parser';
import cors from "cors";
import csurf from 'csurf';
import express from 'express';

import userRoutes from "./routes/user/auth/userRoutes.js";
import userProperty from "./routes/user/userProperty.js";

// This script also sets up the environment variables in .env
import db from "./config/db.js";

const app = express();

// Cors whitelist
let whitelist = [process.env.ORIGIN];

// Add another one
let new_origin = process.env.ORIGIN_1;
if(new_origin) whitelist.push(new_origin);

app.use(cors({
    origin: [
        ...whitelist,
    ]
}));

// Enable cookie parser
app.use(cookieParser());

// Enable CSRF protection
app.use(csurf({
    cookie: true,
}));

// Connect to db
try {
    await db.authenticate();
    
    db.sync();
    
    console.log("Successfully connected to db");
} catch(err) {
    console.error(err);
}

// Enable pug
app.set("view engine", "pug");
app.set("views", "./views");

// Public folder
app.use(express.static("public"));

// User routes
app.use("/auth", userRoutes);
app.use("/user/property", userProperty);

// Open server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});
