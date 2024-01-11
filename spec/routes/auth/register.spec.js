import dotenv from "dotenv";

import { serverUrl } from "../../../src/controllers/env/env.js";
import TestAuthAPI from "../../../src/api/auth/TestAuthAPI.js";
import { confirmUserEmail } from "./authUtils.js";

describe("auth/register", () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Create user data
    const userData = {
        name: "Some name",
        email: "some_email@email.com",
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
        await api.loginGetJwt();
        
        // Now delete user, because we only need to check if register was successful
        await api.deleteUser();
        
        // This is practically the same as jest
        expect(registerRes.userRegistered).toBe(true);
    });
});
