import express from 'express';

import userRoutes from "./routes/userRoutes.js";
import db from "./config/db.js";

const app = express();

// Connect to db
try {
    await db.authenticate();
    
    console.log("Successfully connected to db");
} catch(err) {
    console.error(err);
}

// Ip and port
const ip = "127.0.0.1";
const port = 3001;

// Enable pug
app.set("view engine", "pug");
app.set("views", "./views");

// Public folder
app.use(express.static("public"));

// User routes
app.use("/auth", userRoutes);

// Open server
app.listen(port, () => {
    console.log(`Server running at http://${ip}:${port}`);
});
