import { constants } from "node:buffer";
import path from "node:path";
import fs from "node:fs";

export default function userFolder() {
    const userFolderPath = path.resolve(process.cwd(), 'public/user');
    return userFolderPath;
}

export function createPublicUserFolder() {
    const userFolderPath = path.resolve(process.cwd(), 'public/user');
    try {
        fs.accessSync(userFolderPath, constants.F_OK);
    } catch(err) {
        // The folder doesn't exists
        // Create folder
        fs.mkdirSync(userFolderPath);
    }
}
