import { isLoggedIn } from "../lib/cookies/index.js";

/**
 * Show user navbar if it exists
 */
export function showUserNavbar() {
    if(isLoggedIn()) {
        // Show user navbar
        document.getElementById("navbar:session:authenticatedNavbar").hidden = false;
        
        // Hide login button
        document.getElementById("navbar:session:login").hidden = true;
    }
}

console.log(`Show something`);

showUserNavbar();
