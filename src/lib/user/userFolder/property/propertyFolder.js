import { constants } from "node:buffer";
import path from "node:path";
import fs from "node:fs";

import userPropertyFolder from "./index.js";

/**
 * Get user property folder
 * 
 * @param {string} userEmail User email
 * @param {int} id Property ID
 * @returns {string} Given property folder
 */
export default function propertyFolder(userEmail, id) {
    console.log(`Email given: ${userEmail}`);
    console.log(`Id: ${id}`);
    
    const parentFolder = userPropertyFolder(userEmail);
    
    // Create user property folder
    const propFolder = path.resolve(parentFolder, `${id}`);
    try {
        fs.accessSync(propFolder, constants.F_OK);
    } catch(err) {
        // The folder doesn't exists
        // Create folder
        fs.mkdirSync(propFolder);
    }
    
    return propFolder;
}
