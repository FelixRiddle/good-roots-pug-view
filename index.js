import Server from "./src/Server.js";
import { setupAll } from "./src/controllers/setDefaultEnvVariables.js";

// Run server
(async () => {
    // Set environment variables
    setupAll();
    
    let server = new Server();
    
    // Setup middleware, mount routes
    server.setup();
    
    // Serve
    server.serve();
})();
