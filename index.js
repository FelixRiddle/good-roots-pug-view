import express from 'express';

import userRoutes from "./routes/userRoutes.js";

const app = express();

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
