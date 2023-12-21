/**
 * Take variables from the environment and get the server url
 */
export function serverUrl() {
    if(!process.env.SERVER_PORT) {
        // When the website is on production, it's unnecessary to give the port
        return `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}`;
    } else {
        // Mostly for development it's necessary to have a specific port
        // Nevertheless, it could also be production too.
        return `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;
    }
}
