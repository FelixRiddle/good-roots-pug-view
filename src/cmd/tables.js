import {
    // MySQLDatabaseConnection,
    mysqlConn,
    
    Category,
    DebugPropertyImageUpload,
    Price,
    Property,
    User,
    UserMessages,
} from "app-models";
import PropertyImages from "good-roots-assets/src/PropertyImages.js";

import users from "../seed/users.js";
import prices from "../seed/prices.js";
import categories from "../seed/categories.js";
import UsersFolder from "../user/UsersFolder.js";
import { printMysqlEnvironmentVariables } from "../controllers/env/setDefaultEnvVariables.js";

// Main
async function main(args) {
    // // Drop all
    // if(args.downAll) {
    //     await downAll();
    // }
    
    // // Create all
    // if(args.upAll) {
    //     await upAll();
    // }
    
    if(args.resetTables) {
        
        printMysqlEnvironmentVariables();
        
        const tablesController = new TablesController();
        
        await tablesController.initialize();
        await tablesController.dropAll();
        await tablesController.upAll();
    }
}

/**
 * Tables controller
 * 
 * To manage all tables
 */
class TablesController {
    constructor() {}
    
    /**
     * Initialize
     */
    async initialize() {
        const db = mysqlConn();
        console.log(`Tables db connection`);
        
        // Authenticate
        await db.authenticate();
        console.log(`Authenticated`);
        
        this.db = db;
        
        return this;
    }
    
    /**
     * Create property folders and insert the corresponding images
     */
    updatePropertyImages() {
        const propImgs = new PropertyImages();
        // console.log(`Property images: `, propImgs.getAll());
    }
    
    /**
     * Create tables
     */
    async upAll() {
        try {
            // Create tables
            // db.sync doesn't seems to work
            await this.createAll();
            
            // Insert data
            console.log(`User: `, new User());
            await Promise.all([
                new Category().bulkCreate(categories),
                new Price().bulkCreate(prices),
                new User().bulkCreate(users),
            ]);
            
            // Seed properties
            // Find user with email 'eugene@example.com'
            // const user = User.find();
            
            // Set property images
            this.updatePropertyImages();
            
            console.log(`Tables seeded`);
        } catch(err) {
            console.log(err);
        }
    }
    
    /**
     * Drop all tables
     */
    async downAll() {
        try {
            // This should drop everything in cascade
            await this.db.drop();
            
            // Temporal fix
            // await this.dropAll();
            
            // Remove user folder
            const usersFolder = new UsersFolder();
            usersFolder.delete();
            console.log(`Deleted user folder`);
            
            console.log(`Tables down`);
        } catch(err) {
            console.log(`Drop table error`);
        }
    }
    
    // --- Drop and create models ---
    /**
     * Models from high independence to low independence
     * 
     * @returns {Array}
     */
    models() {
        const modelArray = [
            // Independent
            new User(),
            new DebugPropertyImageUpload(),
            new Category(),
            new Price(),
            
            // Dependents
            new Property(),
            new UserMessages(),
        ];
        
        return modelArray;
    }
    
    /**
     * Drop all tables
     * 
     * I don't know why db.drop doesn't work
     */
    async dropAll() {
        for(const model of this.models().reverse()) {
            try {
                await model.drop();
            } catch(err) {
                console.log(`Couldn't drop model: `, model);
            }
        }
    }
    
    /**
     * Create all
     */
    async createAll() {
        for(const model of this.models()) {
            try {
                await model.sync();
            } catch(err) {
                console.log(`Couldn't sync model: `, model);
            }
        }
    }
}

export default main;
