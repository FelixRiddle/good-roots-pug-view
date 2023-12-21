// Set default env variables

/**
 * Setup protocol
 */
export function setupProtocol() {
    if(!process.env.SERVER_PROTOCOL) {
        process.env["SERVER_PROTOCOL"] = 'https';
    }
}

/**
 * Setup all
 */
export function setupAll() {
    setupProtocol();
}

