import { serverUrl } from "../../controllers/env/env.js";
import propertyFolder from "../../lib/user/userFolder/property/propertyFolder.js";
import userFolder from "../../lib/user/userFolder/userFolder.js";
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
        // Start creating the debug property upload messages from here
        // First message, attempting to upload a property
        
        // Find user
        const userData = req.user;
        const User = req.models.User;
        const user = await User.findOne({
            where: {
                id: userData.id
            },
            raw: true,
        });
        
        // Check if the user exists
        if(!user) {
            console.error(`User doesn't exists!`);
            return res.redirect(`${serverUrl()}/user/property/admin`);
        }
        
        // Create user folder
        userFolder(user.id);
        
        // Now property folder if it exists
        const { id } = req.params;
        if(!id) {
            console.error(`No property id given`);
            return res.redirect(`${serverUrl()}/user/property/admin`);
        }
        
        const Property = req.models.Property;
        
        // Validate that the property exists
        // To prevent a potential exploit
        const property = await Property.findByPk(id);
        if(!property) {
            console.error(`Property not found!`);
            return res.redirect(`${serverUrl()}/user/property/admin`);
        }
        
        // Validate that the property belongs to the one who made the request
        const userId = user.id.toString();
        const propOwnerId = property.userId.toString();
        
        // Check if both match
        if(userId !== propOwnerId) {
            console.warn(`User id doesn't match property id!`);
            console.error(`${userId} != ${propOwnerId}`);
            return res.redirect(`${serverUrl()}/user/property/admin`);
        }
        
        // Create and get property folder
        propertyFolder(user.id, id);
        
        return next();
    } catch(err) {
        console.error(err);
        return res.redirect(`${serverUrl()}/user/property/admin`, {
            messages: [{
                message: `Bro didn't pass the vibe check :skull:`,
                error: true,
            }]
        });
    }
}
