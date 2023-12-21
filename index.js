import Server from "./src/Server.js";
import { serverUrl } from "./src/controllers/env/env.js";
import { setupAll } from "./src/controllers/env/setDefaultEnvVariables.js";

// Run server
(async () => {
    // Set environment variables
    setupAll();
    console.log(`Server url: ${serverUrl()}`)
    
    let server = new Server();
    
    // Setup middleware, mount routes
    server.setup();
    
    // Serve
    server.serve();
})();
