// Login
import FrontendAuthAPI from "../../api/auth/FrontendAuthAPI.js";

// Maybe later there's a process to get the server url, so I would just update this function
// that's why I don't use location.origin alone
import serverUrl from "../../web/serverUrl.js";

/**
 * Get login user data
 */
function getLoginUserData() {
    const emailId = "email";
    const passwordId = "password";
    
    const emailInput = document.getElementById(emailId);
    if(!emailInput) {
        console.log(`Couldn't find email input!`);
        return;
    }
    
    const passwordInput = document.getElementById(passwordId);
    if(!passwordInput) {
        console.log(`Couldn't find password input!`);
        return;
    }
    
    const userData = {
        email: emailInput.value,
        password: passwordInput.value,
    };
    
    return userData;
}

(async () => {
    // Get submit input element
    const submitId = "submitLogin";
    const submitInput = document.getElementById(submitId);
    if(!submitInput) {
        console.log(`Couldn't find submit input!`);
        return;
    }
    
    // On submit click
    submitInput.addEventListener("click", async (e) => {
        e.preventDefault();
        
        // TODO: Frontend validation
        const userData = getLoginUserData();
        
        const api = new FrontendAuthAPI(userData);
        
        const response = await api.loginUser();
        console.log(`Response: `, response);
        
        window.location.href = `${serverUrl()}/home`;
    });
})();

