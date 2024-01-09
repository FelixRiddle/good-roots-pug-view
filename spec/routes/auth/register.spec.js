import dotenv from "dotenv";

import privateConfirmEmail from "../../../src/api/auth/privateConfirmEmail.js";
import { serverUrl } from "../../../src/controllers/env/env.js";
import AuthenticationAPI from "../../../src/public/js/lib/auth/AuthenticationAPI.js";
import ConfirmationEmailPrivateKey from "../../../src/controllers/env/private/ConfirmationEmailPrivateKey.js";

/**
 * Confirm user email through backdoor access
 * 
 * @param {string} email User email
 */
async function confirmUserEmail(email) {
    console.log(`Confirming user email`);
    
    // Confirm E-mail
    // Get private access key to confirm the email
    const confirmEmail = new ConfirmationEmailPrivateKey();
    const privateKey = confirmEmail.loadLocally();
    
    console.log(`Private key: ${privateKey}`);
    const confirmationRes = await confirmEmail.confirmEmail(email);
    console.log(`Confirmation result: `, confirmationRes);
}

describe("auth/register", () => {
    
    // IDK why but right after I completed the private email endpoint, jasmine just stopped setting up
    // environment variables???????///? 😅😂
    // This is a bit ridiculous
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Create user data
    const userData = {
        name: "Some name",
        email: "some_email1234@email.com",
        password: "asd12345",
        confirmPassword: "asd12345"
    };
    
    const url = serverUrl();
    console.log(`Server url: ${url}`);
    const api = new AuthenticationAPI(userData, url);
    
    it('Register user', async function() {
        const registerRes = await api.registerUser();
        console.log(`Register response: `, registerRes);
        
        // Confirm user email
        await confirmUserEmail(userData.email);
        
        // Login user to be able to delete it
        const loginRes = await api.loginUser();
        console.log(`Login response: `, loginRes);
        
        // Now delete user, because we only need to check if register was successful
        
        // This is practically the same as jest
        expect(data.userRegistered).toBe(true);
    });
});
