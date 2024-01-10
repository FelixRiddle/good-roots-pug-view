import dotenv from "dotenv";

import { serverUrl } from "../../../src/controllers/env/env.js";
import ConfirmationEmailPrivateKey from "../../../src/controllers/env/private/ConfirmationEmailPrivateKey.js";
import UserAPI from "../../../src/public/js/api/user/UserAPI.js";
import TestAuthAPI from "../../../src/api/auth/TestAuthAPI.js";

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
    await confirmEmail.confirmEmail(email);
}

describe("auth/register", () => {
    
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
    const api = new TestAuthAPI(userData, url);
    
    it('Register user', async function() {
        const registerRes = await api.registerUser();
        
        // Confirm user email
        await confirmUserEmail(userData.email);
        
        // Login user to be able to delete it
        const loginRes = await api.loginUser();
        console.log(`User logged in`);
        
        // Now delete user, because we only need to check if register was successful
        console.log(`Url: ${url}`);
        const deleteRes = await api.deleteUser();
        console.log(`User deleted, response: `, deleteRes);
        
        // This is practically the same as jest
        expect(registerRes.userRegistered).toBe(true);
    });
});
