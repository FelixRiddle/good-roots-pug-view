import fs from "node:fs";

// Checks if the user folder exists and creates it if it doesn't
async function userFolder(req, res, next) {
    
    // Get user
    const reqUser = fs.promises.access()
    
    // Check if the user folder exists
    
    return next();
}

export default userFolder;
