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


// Check if it was executed from the command line
if(process.argv[2] === "-i") {
    await importData();
}
