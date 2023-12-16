import cookieParser from 'cookie-parser';
import cors from "cors";
import express from 'express';

// This script also sets up the environment variables in .env
import db from './config/db.js';
import routes from './routes/index.js';
import getUser from './middleware/auth/getUser.js';

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
        this.app.use(getUser, routes);
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
     * Enable CSP
     * 
     * TODO: Eval should be removed, but there's a package that uses it, I don't even know which one.
     * TODO: A lot of things should be banned, that's the point of CSP.
     */
    enableCsp() {
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
                "cdnjs.cloudflare.com",
                "geocode-api.arcgis.com",
                "cdn.jsdelivr.net"
            ];
            let domains = "";
            for(let domain of allowedDomains) {
                domains += `${domain} `;
            }
            let scriptSrc = `script-src ${domains}'self' 'unsafe-eval' 'unsafe-inline';`;
            let styleSrc = `style-src ${domains}'self' 'unsafe-inline';`;
            let imgSrc = `img-src ${domains}'self' data:;`;
            let defaultSrc = `default-src ${domains}'self' 'unsafe-eval' 'unsafe-inline';`;
            let fontAndFrame = "font-src 'self'; frame-src 'self';";
            
            let cspPolicy = `${fontAndFrame} ${defaultSrc} ${scriptSrc} ${styleSrc} ${imgSrc}`;
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
    }
    
    /**
     * Setup some things
     */
    async setupMiddleware() {
        this.enableCsp();
        
        // I don't know
        this.app.use(express.urlencoded({
            extended: true,
        }));
        
        // Json parser middleware
        this.app.use(express.json())
        
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
        
        this.usePugView();
        
        // Public assets folder
        this.app.use(express.static("public"));
    }
    
    /**
     * Enable pug
     */
    usePugView() {
        // this.app.enable("view cache");
        
        // Enable pug
        this.app.set("view engine", "pug");
        this.app.set("views", "./views");
    }
}
