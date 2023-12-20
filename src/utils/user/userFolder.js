import { constants } from "node:buffer";
import path from "node:path";
import fs from "node:fs";
import User from "../../models/User.js";

/**
 * User folder
 * 
 * Creates it if it doesn't exists.
 * TODO: The user folder should be created on registry but it's too much of a hassle rn
 * 
 * @param {string} userEmail User email
 * @returns 
 */
export default function userFolder(userEmail) {
    const userFolderPath = path.resolve(process.cwd(), `public/user/${userEmail}`);
    console.log(`User folder path: ${userFolderPath}`);
    
    // Create user folder
    try {
        fs.accessSync(userFolderPath, constants.F_OK);
    } catch(err) {
        // The folder doesn't exists
        // Create folder
        fs.mkdirSync(userFolderPath);
    }
    
    // Create user property folder
    const userPropertyFolder = path.resolve(userFolderPath, `property`);
    console.log(`User properties folder: ${userPropertyFolder}`);
    try {
        fs.accessSync(userPropertyFolder, constants.F_OK);
    } catch(err) {
        // The folder doesn't exists
        // Create folder
        fs.mkdirSync(userPropertyFolder);
    }
    
    return userFolderPath;
}

/**
 * Create public user folder
 */
export function createPublicUserFolder() {
    const userFolderPath = path.resolve(process.cwd(), 'public/user');
    
    // Create user folder
    try {
        fs.accessSync(userFolderPath, constants.F_OK);
    } catch(err) {
        // The folder doesn't exists
        // Create folder
        fs.mkdirSync(userFolderPath);
    }
}
