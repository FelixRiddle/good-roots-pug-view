// I need to reduce dependency on sending the user from the server side
// if we already have a session token.
// In this age, this shouldn't be done, but for now it will.

/**
 * Get cookies
 * 
 * @returns 
 */
function getCookies(){
    const pairs = document.cookie.split(";");
    let cookies = {};
    
    for (var i=0; i<pairs.length; i++){
        var pair = pairs[i].split("=");
        cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    
    return cookies;
  }
  
/**
 * Check if the user is logged in
 */
export function isLoggedIn() {
    // Get user token from local storage
    // const userToken = localStorage.getItem("_token");
    
    const cookies = getCookies();
    console.log(`Cookies: `, cookies);
    
    return userToken && true;
}

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
