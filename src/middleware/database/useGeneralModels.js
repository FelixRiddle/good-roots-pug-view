import createModels from "../../lib/database/mysql/createModels.js";

/**
 * General models
 * 
 * This route will use a single instance of sequelize for every connection(How it should be).
 * 
 */
export default function useGeneralModels() {
    const models = createModels();
    
    // The middleware
    return function generalModelMiddleware(req, res, next) {
        // Every route will use models
        req.models = models;
        
        next();
    }
}
