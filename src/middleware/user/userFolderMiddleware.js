import userFolder from "../../utils/user/userFolder.js";

/**
 * Checks if the user folder exists and creates it if it doesn't
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * @returns 
 */
export default async function userFolderMiddleware(req, res, next) {
    const user = req.user.get({plain: true});
    
    // Create folder if not exists
    userFolder(req.user.email);
    
    return next();
}
