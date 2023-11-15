import categories from "./categories.js";
import prices from "./prices.js";
import users from "./users.js";
import {
    Category, Price, Property, User,
} from "../models/index.js";
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
            User.bulkCreate(users), 
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
            // The relation is property to price, so you first have to delete property
            Property.destroy({ where: {}, truncate: true }),
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


export {
    deleteData,
    importData,
}
