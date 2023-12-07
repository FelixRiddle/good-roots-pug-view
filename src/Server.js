import cookieParser from 'cookie-parser';
import cors from "cors";
import express from 'express';

import userRoutes from "./routes/user/auth/userRoutes.js";
import userProperty from "./routes/user/userProperty.js";

// This script also sets up the environment variables in .env
import db from './config/db.js';
import router from './routes/user/property/index.js';

/**
 * Server
 * 
 */
export default class Server {
    constructor() {
        const app = express();
        this.app = app;
    }
    
    /**
     * Mount routes
     */
    mountRoutes() {
        // User routes
        this.app.use("/auth", userRoutes);
        this.app.use("/user/property", router)
        this.app.use("/user/property", userProperty);
    }
    
    /**
     * Start serving requests
     */
    serve() {
        // Open server
        this.app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
        });
    }
    
    /**
     * Setup all
     */
    async setup() {
        await this.setupMiddleware();
        
        this.mountRoutes();
    }
    
    /**
     * Setup some things
     */
    async setupMiddleware() {
        // CSP policy
        let cspPolicy = (() => {
            // Array of allowed domains
            // Note that subdomains are disallowed by default, so you must set the star
            // to allow every subdomain.
            let allowedDomains = [
                "unpkg.com",
                "*.unpkg.com",
                "openstreetmap.org",
                "*.openstreetmap.org",
                "cloudflare.com",
                "*.cloudflare.com",
                "cdnjs.cloudflare.com"
            ];
            let domains = "";
            for(let domain of allowedDomains) {
                domains += `${domain} `;
            }
            let scriptSrc = `script-src ${domains}'self' 'unsafe-eval' 'unsafe-inline';`;
            let styleSrc = `style-src ${domains}'self' 'unsafe-inline';`;
            let imgSrc = `img-src ${domains}'self' data:;`;
            
            // Allow self
            let allowSelf = "font-src 'self'; frame-src 'self';";
            let cspPolicy = `${allowSelf} ${scriptSrc} ${styleSrc} ${imgSrc}`;
            console.log(`Csp policy: ${cspPolicy}`);
            
            return cspPolicy;
        })();
        
        // Set CSP
        this.app.use((req, res, next) => {
            res.setHeader(
                'Content-Security-Policy',
                cspPolicy
            );
            next();
        });
        
        // IDK
        this.app.use(express.urlencoded({
            extended: true,
        }));
        
        // Cors whitelist
        let whitelist = [process.env.ORIGIN];
        
        // Add another one
        let new_origin = process.env.ORIGIN_1;
        if(new_origin) whitelist.push(new_origin);
        
        this.app.use(cors({
            origin: [
                ...whitelist,
            ]
        }));
        
        // Enable cookie parser
        this.app.use(cookieParser());
        
        // Connect to db
        try {
            await db.authenticate();
            
            db.sync();
            
            console.log("Successfully connected to db");
        } catch(err) {
            console.error(err);
        }
        
        // Enable pug
        this.app.set("view engine", "pug");
        this.app.set("views", "./views");
        
        // Public folder
        this.app.use(express.static("public"));
    }
}
