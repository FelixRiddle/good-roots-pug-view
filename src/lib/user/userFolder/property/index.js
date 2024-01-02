import { constants } from "node:buffer";
import path from "node:path";
import fs from "node:fs";
import { relativeUserFolder } from "../userFolder.js";

/**
 * User property folder
 * 
 * Container folder for property folders
 * 
 * @param {string} userId User id
 * @returns {string} Path to the folder
 */
export default function userPropertyFolder(userId) {
    const userFolderPath = path.resolve(process.cwd(), `public/user/${userId}`);
    
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
 * @param {string} userId User id
 * @returns {string}
 */
export function relativeUserPropertyFolder(userId) {
    return `${relativeUserFolder(userId)}/property`;
}
