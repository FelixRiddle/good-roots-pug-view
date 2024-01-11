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
        email: "some_email0@email.com",
        password: "asd12345",
        confirmPassword: "asd12345"
    };
    
    const url = serverUrl();
    const api = new TestAuthAPI(userData, url);
    
    it('Login user', async function() {
        await api.registerUser();
        
        await confirmUserEmail(userData.email);
        
        const loginRes = await api.loginGetJwt();
        
        await api.deleteUser();
        
        expect(typeof(loginRes.token) === 'string').toBe(true);
    });
});
