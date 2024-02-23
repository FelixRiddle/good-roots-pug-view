console.log(`[First line of code]`);

// First of all the environment variables
import { setupAll } from "./src/controllers/env/setDefaultEnvVariables.js";

import Server from "./src/Server.js";

import { testSetup } from "./src/test/testSetup.js";

// Run server
(async () => {
    
    // Set environment variables
    setupAll();
    
    testSetup();
    
    let server = new Server();
    
    // Setup middleware, mount routes
    server.setup();
    
    // Serve
    server.serve();
})();
