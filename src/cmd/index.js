import { ArgumentParser } from "argparse";

import packageJson from "../../package.json" assert { type: 'json' };

import seeder from "./seeder.js";
import tables from "./tables.js";

const version = packageJson.version;

const parser = new ArgumentParser({
    description: "Argparse example"
});

// Create arguments
// --- Database ---
// --- Seeder ---
parser.add_argument("--seedCategories", {
    help: "Insert categories data into the database",
    action: "store_true"
});

parser.add_argument("--seedPrices", {
    help: "Insert prices data into the database",
    action: "store_true"
});

parser.add_argument("--seedUsers", {
    help: "Insert users into the database",
    action: "store_true"
});

parser.add_argument("--seedProperties", {
    help: "Insert properties into the database",
    action: "store_true"
});

// --- Tables ---
parser.add_argument("--upAll", {
    help: "Create every project table",
    action: "store_true"
});

parser.add_argument("--downAll", {
    help: "Drop every table",
    action: "store_true"
});

parser.add_argument("--resetTables", {
    help: "Destroy and create the tables again with the default data",
    action: "store_true"
})

// Parse arguments
let args = parser.parse_args();

// Execute everything asynchronously
(async () => {
    
    // Tables
    await tables(args);
    
    // Seeder
    await seeder(args);
    
    process.exit(0);
})();
