import db from "../config/db.js";

import Category from "../models/Category.js";
import Price from "../models/Price.js";
import User from "../models/User.js";
import Property from "../models/Property.js";

import users from "../seed/users.js";
import prices from "../seed/prices.js";
import categories from "../seed/categories.js";

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

// Create every project table
async function upAll() {
    try {
        // Authenticate
        await db.authenticate()
            .then((res) => {
                console.log(`Connected`);
            })
            .catch((err) => {
                console.error(err);
            });
        
        // Generate columns
        await db.sync();
        
        // Insert data
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(users),
        ]);
        
        console.log(`Data inserted correctly`);
    } catch(err) {
        console.log(err);
    }
}

// Destroy the data of every table
async function downAll() {
    try {
        console.log(`Authenticating`);
        
        // Authenticate
        await db.authenticate()
            .then((res) => {
                console.log(`Connected`);
            })
            .catch((err) => {
                console.error(err);
            });
        
        console.log(`Synching`);
        
        // Generate columns
        await db.sync();
        
        console.log(`Destroying tables`);
        
        // Delete data
        // You can't put everything together
        // First those that depend on others, go down
        await Promise.all([
            // The relation is property to price, so you first have to delete property
            Property.destroy({ where: {}, truncate: true }),
        ]);
        // Now the ones that don't depend on anything
        await Promise.all([
            Category.destroy({ where: {}, truncate: true }),
            User.destroy({ where: {}, truncate: true }),
            Price.destroy({ where: {}, truncate: true }),
        ]);
        
        console.log(`Data deleted correctly`);
    } catch(err) {
        console.log(`Error`);
        console.log(err);
    }
}

export default main;
