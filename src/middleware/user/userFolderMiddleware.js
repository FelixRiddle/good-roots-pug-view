import { serverUrl } from "../../controllers/env/env.js";
import propertyFolder from "../../lib/user/userFolder/property/propertyFolder.js";
import userFolder from "../../lib/user/userFolder/userFolder.js";

const DEBUG = true;

/**
 * Checks if the user folder exists and creates it if it doesn't
 * 
 * It also creates the property folder
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * @returns 
 */
export default async function userFolderMiddleware(req, res, next) {
    try {
        if(DEBUG) {
            console.log(`Base url: `, req.baseUrl);
            console.log(`Url: `, req.url);
            console.log(`Full url: `, req.originalUrl);
        }
        
        // Start creating the debug property upload messages from here
        // First message, attempting to upload a property
        
        
        // Create user folder first
        // Get user plain information
        const user = req.user.get({plain: true});
        if(!user) {
            console.log(`User doesn't exists!`);
            return res.redirect(`${serverUrl()}/user/property/admin`);
        }
        
        // Create user folder
        userFolder(user.id);
        
        // Now property folder if it exists
        const { id } = req.params;
        if(!id) {
            console.log(`No property id given`);
            return res.redirect(`${serverUrl()}/user/property/admin`);
        }
        
        const Property = req.models.Property;
        
        // Validate that the property exists
        // To prevent a potential exploit
        const property = await Property.findByPk(id);
        console.log(`Id: ${id}`);
        if(!property) {
            console.log(`Property not found!`);
            return res.redirect(`${serverUrl()}/user/property/admin`);
        }
        console.log(`Property does exist, pass`);
        
        // Validate that the property belongs to the one who made the request
        const userId = user.id.toString();
        const propOwnerId = property.userId.toString();
        
        // Check if both match
        if(userId !== propOwnerId) {
            console.log(`User id doesn't match property id!`);
            console.log(`${userId} != ${propOwnerId}`);
            return res.redirect(`${serverUrl()}/user/property/admin`);
        }
        console.log(`User owns the property`);
        
        // Create and get property folder
        propertyFolder(user.id, id);
        
        console.log(`Created property folder`);
        
        return next();
    } catch(err) {
        console.log(`Error: `, err);
        console.log(`Bro didn't pass the vibe check :skull:`);
        return res.redirect(`${serverUrl()}/user/property/admin`, {
            messages: [{
                message: `Bro didn't pass the vibe check :skull:`,
                error: true,
            }]
        });
    }
}
