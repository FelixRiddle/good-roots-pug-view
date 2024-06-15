/**
 * Get cookies
 * 
 * @returns 
 */
export function getCookies(){
    const pairs = document.cookie.split(";");
    let cookies = {};
    
    for (let i=0; i < pairs.length; i++){
        const pair = pairs[i].split("=");
        cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
    }
    
    return cookies;
}

/**
 * Check if the user is logged in
 */
export function isLoggedIn() {
    // Get cookies
    const cookies = getCookies();
    
    const userToken = cookies["_token"];
    
    return userToken && true;
}
