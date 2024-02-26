import Sequelize from "sequelize";

import PropertyImages from "good-roots-assets/src/PropertyImages.js";
import { MySQLDatabaseConnection } from "express-authentication";

// Table definitions
import ExpressAuthentication from "express-authentication";
const { User } = ExpressAuthentication;

import UserMessages from "../models/UserMessages.js";
import DebugPropertyImageUpload from "../models/DebugPropertyImageUpload.js";
import Category from "../models/Category.js";
import Price from "../models/Price.js";
import Property from "../models/Property.js";

import users from "../seed/users.js";
import prices from "../seed/prices.js";
import categories from "../seed/categories.js";
import UsersFolder from "../user/UsersFolder.js";
import { printMysqlEnvironmentVariables } from "../controllers/env/setDefaultEnvVariables.js";

const mySqlConn = () => {
    // Mysql information
    const MYSQL_NAME = process.env.DATABASE_NAME ?? process.env.MYSQL_DATABASE_NAME;
    const MYSQL_USERNAME = process.env.DATABASE_USERNAME ?? process.env.MYSQL_USERNAME ?? "root";
    const MYSQL_PASSWORD = process.env.DATABASE_PASSWORD ?? process.env.MYSQL_PASSWORD ?? "";
    const MYSQL_HOST = process.env.DATABASE_HOST ?? process.env.MYSQL_HOST ?? "localhost";
    const MYSQL_PORT = process.env.MYSQL_PORT ?? 3306;

    const MySQLDatabaseConnection = new Sequelize(MYSQL_NAME, MYSQL_USERNAME, MYSQL_PASSWORD, {
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        dialect: "mysql",
        define: {
            timestamps: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 60 * 1000,
        },
        operatorAliases: false,
        // Disable logging
        logging: false
    });
    
    return MySQLDatabaseConnection;
}

// Main
async function main(args) {
    // Drop all
    if(args.downAll) {
        await downAll();
    }
    
    // Create all
    if(args.upAll) {
        await upAll();
    }
    
    // Reset tables
    if(args.resetTables) {
        await downAll();
        await upAll();
    }
}

/**
 * Create property folders and insert the corresponding images
 */
function updatePropertyImages() {
    const propImgs = new PropertyImages();
    // console.log(`Property images: `, propImgs.getAll());
}

/**
 * Create tables and seed some data
 */
async function upAll() {
    
    try {
        printMysqlEnvironmentVariables();
        
        const db = mySqlConn();
        console.log(`Tables db connection`);
        
        // Authenticate
        await db.authenticate();
        console.log(`Authenticated`);
        
        // [Problem not fixed] This should create everything
        // Create all tables
        // await db.sync({
        //     force: true,
        // });
        
        // Temporal fix
        await createAll();
        
        // Insert data
        console.log(`User: `, User);
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(users),
        ]);
        
        // Seed properties
        // Find user with email 'eugene@example.com'
        // const user = User.find();
        
        // Set property images
        updatePropertyImages();
        
        console.log(`Tables seeded`);
    } catch(err) {
        console.log(err);
    }
}

/**
 * Drop tables
 */
async function downAll() {
    try {
        const db = MySQLDatabaseConnection;
        console.log(`Tables db connection`);
        
        // Authenticate
        await db.authenticate();
        
        await db.sync();
        
        // [Problem not fixed] This should drop everything in cascade
        // await db.drop();
        
        // Temporal fix
        await dropAll();
        
        // Remove user folder
        const usersFolder = new UsersFolder();
        usersFolder.delete();
        console.log(`Deleted user folder`);
        
        console.log(`Tables down`);
    } catch(err) {
        console.log(`Drop table error`);
        // Maybe trying to drop a table that doesn't exists
        // console.log(`Error`);
        // console.log(err);
    }
}

/**
 * Drop all tables
 * 
 * I don't know why db.drop doesn't work
 */
async function dropAll() {
    const tables = [
        // Low independence
        Property,
        UserMessages,
        
        User,
        DebugPropertyImageUpload,
        Category,
        Price,
        // High independence
    ];
    
    for(const table of tables) {
        await table.drop();
    }
}

/**
 * Create all
 */
async function createAll() {
    const tables = [
        // Independent
        User,
        DebugPropertyImageUpload,
        Category,
        Price,
        
        // Dependents
        Property,
        UserMessages,
    ];
    
    for(const table of tables) {
        await table.sync();
    }
}

export default main;
