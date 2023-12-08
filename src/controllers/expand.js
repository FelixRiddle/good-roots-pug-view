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
    const userController = req.user;
    // Make it falsy, to easily check if it exists
    let user = undefined;
    if(userController) {
        user = userController.get({ plain: true });
    }
    
    let ip = process.env.IP;
    let port = process.env.PORT;
    return {
        user,
        websiteInfo: {
            baseUrl: `http://${ip ? ip : "127.0.0.1"}:${port ? port : "3000"}`
        }
    };
}
