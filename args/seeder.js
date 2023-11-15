// Insert categories data
async function insertCategoriesData() {
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
        console.error(err);
    }
}

export {
    insertCategoriesData,
}
