// It works like this
import {
    MySQLDatabaseConnection,
    
    Category,
    Price,
    User,
} from "app-models";

import users from "../seed/users.js";
import prices from "../seed/prices.js";
import categories from "../seed/categories.js";

const db = MySQLDatabaseConnection;

// Main function
async function main(args) {
    // Seed categories
    if(args.seedCategories) {
        // Insert category data
        await insertCategoriesData();
    }
    
    // Seed prices
    if(args.seedPrices) {
        // Insert property prices data
        await insertPricesData();
    }
    
    // Seed users
    if(args.seedUsers) {
        // Insert users
        await insertUserData();
    }
    
    // Seed properties
    if(args.seedProperties) {
        // Insert properties
        await insertPropertiesData();
    }
    
    return args;
}

// Insert categories data
async function insertCategoriesData() {
    console.log(`Inserting categories data`);
    try {
        // Authenticate
        await db.authenticate();
        
        // Generate columns
        await db.sync();
        
        // Insert data
        await Promise.all([
            Category.bulkCreate(categories),
        ]);
        
        console.log(`Categories inserted`);
    } catch(err) {
        console.log(err);
    }
}

// Insert prices data
async function insertPricesData() {
    try {
        // Authenticate
        await db.authenticate();
        
        // Generate columns
        await db.sync();
        
        // Insert data
        await Promise.all([
            Price.bulkCreate(prices),
        ]);
        
        console.log(`Data inserted correctly`);
    } catch(err) {
        console.log(err);
    }
}

// Insert user data
async function insertUserData() {
    try {
        // Authenticate
        await db.authenticate();
        
        // Generate columns
        await db.sync();
        
        // Insert data
        await Promise.all([
            User.bulkCreate(users),
        ]);
        
        console.log(`Data inserted correctly`);
    } catch(err) {
        console.log(err);
    }
}

// Insert properties
async function insertPropertiesData() {
    try {
        // Authenticate
        await db.authenticate();
        
        // Generate columns
        await db.sync();
        
        // Insert data
        await Promise.all([
        ]);
        
        console.log(`Data inserted correctly`);
    } catch(err) {
        console.log(err);
    }
}

export {
    insertCategoriesData,
    insertPricesData,
    insertPropertiesData,
    insertUserData
}

export default main;
