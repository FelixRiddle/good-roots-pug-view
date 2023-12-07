import Server from "./src/Server.js";

// Run server
(async () => {
    let server = new Server();
    
    // Setup middleware, mount routes
    server.setup();
    
    // Serve
    server.serve();
})();
