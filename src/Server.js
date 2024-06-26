import cookieParser from 'cookie-parser';
import cors from "cors";
import express from 'express';
import session from 'express-session';
import MySQLStore from "express-mysql-session";
import ExpressAuthentication from 'felixriddle.express-authentication';

// This script also sets up the environment variables in .env
import routes from './routes/index.js';
import { createPublicUserFolder } from './lib/user/userFolder/userFolder.js';
import ConfirmationEmailPrivateKey from './controllers/env/private/ConfirmationEmailPrivateKey.js';
import ResetPasswordPrivateKey from './controllers/env/private/ResetPasswordPrivateKey.js';

import SERVER_URL_MAPPINGS from "./mappings/env/SERVER_URL_MAPPINGS.js";

import useGeneralModels from "./middleware/database/useGeneralModels.js";

const { publicMiddleware } = ExpressAuthentication;

const MySQLSession = MySQLStore(session);

/**
 * Server
 * 
 * TODO: Use 'risotto' package.
 */
export default class Server {
    constructor() {
        const app = express();
        this.app = app;
        
        this.createDirectories();
        
        this.setupPrivateAccessKeys();
    }
    
    /**
     * Setup private access keys
     */
    setupPrivateAccessKeys() {
        // --- Email private key ---
        // Key for accessing a single endpoint to confirm the email
        // Setup the env var first
        const emailPrivKey = new ConfirmationEmailPrivateKey();
        emailPrivKey.setConfirmationEmailPrivateKey();
        
        // Now handle saving the file so that the testing framework can access it
        const fileExists = emailPrivKey.fileExists();
        if(!fileExists) {
            // The file doesn't exists?, create it.
            emailPrivKey.saveLocally();
        }
        
        // --- Reset password private key ---
        const resetPassPrivKey = new ResetPasswordPrivateKey();
        resetPassPrivKey.setPrivateKey();
        
        const fileExistsA = resetPassPrivKey.fileExists();
        if(!fileExistsA) {
            resetPassPrivKey.saveLocally();
        }
    }
    
    /**
     * Create directories if they don't exist
     */
    createDirectories() {
        // Public user folder, so they upload thingies
        createPublicUserFolder();
    }
    
    /**
     * Mount routes
     */
    mountRoutes() {
        // Use a single instance of sequelize for every connection
        this.app.use(useGeneralModels());
        
        // FIXME: This is used to send user data to the frontend, but I think the frontend should check
        // local storage and change on that basis.
        this.app.use(publicMiddleware.publicGetUser, routes);
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
            const allowedDomains = [
                "unpkg.com",
                "*.unpkg.com",
                "openstreetmap.org",
                "*.openstreetmap.org",
                "cloudflare.com",
                "*.cloudflare.com",
                "cdnjs.cloudflare.com",
                "geocode-api.arcgis.com",
                "cdn.jsdelivr.net",
                SERVER_URL_MAPPINGS.GOOD_ROOTS,
                SERVER_URL_MAPPINGS.AUTHENTICATION,
                SERVER_URL_MAPPINGS.BACKDOOR_SERVER_ACCESS,
                SERVER_URL_MAPPINGS.REAL_ESTATE,
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
        let whitelist = [
            SERVER_URL_MAPPINGS.GOOD_ROOTS,
            SERVER_URL_MAPPINGS.AUTHENTICATION,
            SERVER_URL_MAPPINGS.BACKDOOR_SERVER_ACCESS,
            SERVER_URL_MAPPINGS.REAL_ESTATE,
        ];
        
        this.app.use(cors({
            origin: [
                ...whitelist,
            ]
        }));
        
        // Enable cookie parser
        this.app.use(cookieParser());
        
        // const sessionStore = new MySQLSession({
        //     host: process.env.DB_HOST,
        //     port: process.env.DB_PORT,
        //     user: process.env.MYSQL_USERNAME,
        //     password:  process.env.MYSQL_PASSWORD,
        //     database: process.env.DATABASE_NAME,
        //     schema: {
        //         tableName: "sessions",
        //         columnNames: {
        //             session_id: "session_id",
        //             expires: "expires",
        //             data: "data"
        //         }
        //     }
        // });
        
        // // User sessions with coookies
        // // Session may cause issues with cookie parser if the secret is not the same
        // this.app.use(session({
        //     secret: process.env.JWT_SECRET_KEY,
        //     store: sessionStore,
        //     resave: false,
        //     saveUninitialized: false
        // }));
        
        this.usePugView();
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
