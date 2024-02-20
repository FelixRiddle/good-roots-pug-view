import db from "../config/db.js";

import PropertyImages from "good-roots-assets/src/PropertyImages.js";

import Category from "../models/Category.js";
import Price from "../models/Price.js";
import User from "../models/User.js";

// WARNING: Don't remove!!11!!!!! 😡😡😡
// Some tables have to be imported just to be defined
import UserMessages from "../models/UserMessages.js";
import DebugPropertyImageUpload from "../models/DebugPropertyImageUpload.js";

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

/**
 * Create property folders and insert the corresponding images
 */
function updatePropertyImages() {
    const propImgs = new PropertyImages();
    console.log(`Property images: `, propImgs.getAll());
}

/**
 * Create tables and seed some data
 */
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
        
        // Create all tables
        await db.sync();
        
        // Insert data
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(users),
        ]);
        
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
        
        // This method drops every table in sequelize
        await db.drop();
        
        console.log(`Tables down`);
    } catch(err) {
        console.log(`Error`);
        console.log(err);
    }
}

export default main;
