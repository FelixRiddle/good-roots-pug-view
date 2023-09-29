import categories from "./categories.js";
import prices from "./prices.js";
import Category from "../models/Category.js";
import Price from "../models/Price.js";
import db from "../config/db.js";

const importData = async () => {
    try {
        // Authenticate
        await db.authenticate();
        
        // Generate columns
        await db.sync();
        
        // Insert data
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
        ]);
        
        console.log(`Data inserted correctly`);
        
        process.exit();
    } catch(err) {
        process.exit(1);
    }
}

// Delete previous inserted data
const deleteData = async () => {
    try {
        
        // Authenticate
        await db.authenticate();
        
        // Generate columns
        await db.sync();
        
        // Delete data
        await Promise.all([
            Category.destroy({ where: {}, truncate: true }),
            Price.destroy({ where: {}, truncate: true }),
        ]);
        
        console.log(`Data deleted correctly`);
        
        process.exit();
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}

// Insert command
if(process.argv[2] === "-i") {
    await importData();
}

// Delete command
if(process.argv[2] === "-d") {
    await deleteData();
}

