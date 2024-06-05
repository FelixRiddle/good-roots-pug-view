import { ArgumentParser } from "argparse";

import { setupAll } from "../controllers/env/setDefaultEnvVariables.js";
import executeServerCommands from "./server.js";

const parser = new ArgumentParser({
    description: "Argparse example"
});

// Create arguments
parser.add_argument("--serve", {
    help: "Start the server",
    action: "store_true"
});

// Parse arguments
const args = parser.parse_args();

// Execute everything asynchronously
(async () => {
    
    // Set environment variables
    setupAll();
    
    await executeServerCommands(args);
})();
