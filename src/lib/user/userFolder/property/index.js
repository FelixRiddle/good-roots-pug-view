import { constants } from "node:buffer";
import path from "node:path";
import fs from "node:fs";
import { relativeUserFolder } from "../userFolder.js";

/**
 * User property folder
 * 
 * Container folder for property folders
 * 
 * @param {string} userEmail User email
 * @returns {string} Path to the folder
 */
export default function userPropertyFolder(userEmail) {
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
    
    return userPropertyFolder;
}

/**
 * Relative user property folder
 * 
 * Gets the relative user property folder path from public folder
 * 
 * @param {string} userEmail User email
 * @returns {string}
 */
export function relativeUserPropertyFolder(userEmail) {
    return `${relativeUserFolder(userEmail)}/property`;
}
