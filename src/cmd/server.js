import { testSetup } from "../test/testSetup.js";
import Server from "../Server.js";

export async function startServer() {
    testSetup();
    
    const server = new Server();
    
    // Setup middleware, mount routes
    await server.setup();
    
    // Serve
    server.serve();
}

/**
 * Execute server commands
 */
export default async function executeServerCommands(args) {
    // The user wants to start the server
    if(args["serve"]) {
        await startServer();
    }
}
