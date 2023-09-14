import express from 'express';

import userRoutes from "./routes/userRoutes.js";
// This script also sets up the environment variables in .env
import db from "./config/db.js";

const app = express();

// Enable reading request body
app.use(express.urlencoded({
    extended: true,
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

// Open server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});
