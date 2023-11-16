import {
    Category,
} from "../models/index.js";
import categories from "../seed/categories.js";
import db from "../config/db.js";

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
        console.log(`Big ass error: `);
        console.error(err);
    }
}

export {
    insertCategoriesData,
}
