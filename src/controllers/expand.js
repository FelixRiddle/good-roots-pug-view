/**
 * Expand Data
 * 
 * Expands data across the site, useful for pug components to detect it and render content conditionally
 * 
 * It's to be used on every 'res.render(/url, {
 *      ...expand(),
 *      ...
 * })
 * 
 * @param {Object} req The request of express
 * @returns {Object} The object containing the data.
 */
export default function expand(req) {
    // Get user
    const userObject = req.user;
    
    // Make it falsy, to easily check if it exists
    let user = undefined;
    if(userObject) {
        // user = userController.get({ plain: true });
        user = userObject.dataValues;
    }
    
    return {
        user,
    };
}
