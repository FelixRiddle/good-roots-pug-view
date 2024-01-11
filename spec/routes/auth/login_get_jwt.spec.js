import dotenv from "dotenv";

import { serverUrl } from "../../../src/controllers/env/env.js";
import TestAuthAPI from "../../../src/api/auth/TestAuthAPI.js";
import { confirmUserEmail } from "./authUtils.js";

describe("auth/login_get_jwt", () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    const url = serverUrl();
    
    it('Successful login', async function() {
        // Create user data
        const userData = {
            name: "Some name",
            email: "some_email0@email.com",
            password: "asd12345",
            confirmPassword: "asd12345"
        };
        const api = new TestAuthAPI(userData, url);
        
        await api.registerUser();
        
        await confirmUserEmail(userData.email);
        
        const loginRes = await api.loginGetJwt();
        
        await api.deleteUser();
        
        // expect(loginRes && loginRes.token && typeof(loginRes.token) === 'string').toBe(true);
        expect(loginRes.loggedIn).toBe(true);
    });
    
    // --- Test login validation ---
    // Password
    it('Incorrect password', async function() {
        const userData = {
            name: "Some name",
            email: "some_email6@email.com",
            password: "asd12345",
            confirmPassword: "asd12345"
        };
        const api = new TestAuthAPI(userData, url);
        
        await api.registerUser();
        
        await confirmUserEmail(userData.email);
        
        // Change password
        api.userData.password = "asdf123456";
        const loginRes = await api.loginGetJwt();
        
        await api.deleteUser();
        
        expect(!loginRes.loggedIn).toBe(true);
    });
    
    it('Short password', async function() {
        const userData = {
            name: "Some name",
            email: "some_email6@email.com",
            password: "asd12345",
            confirmPassword: "asd12345"
        };
        const api = new TestAuthAPI(userData, url);
        
        await api.registerUser();
        
        await confirmUserEmail(userData.email);
        
        api.userData.password = "asd";
        const loginRes = await api.loginGetJwt();
        
        await api.deleteUser();
        
        expect(!loginRes.loggedIn).toBe(true);
    });
    
    it('Long password', async function() {
        const userData = {
            name: "Some name",
            email: "some_email6@email.com",
            password: "asd12345",
            confirmPassword: "asd12345"
        };
        const api = new TestAuthAPI(userData, url);
        
        await api.registerUser();
        
        await confirmUserEmail(userData.email);
        
        api.userData.password = "sK4z5HQeMT5wQzyrqkwkKi1fTyc7eJe0sBjPpHM83pE3PRce4utfPlOpA6h4pEGm9";
        const loginRes = await api.loginGetJwt();
        
        await api.deleteUser();
        
        expect(!loginRes.loggedIn).toBe(true);
    });
    
    // Email
    it('Wrong email', async function() {
        const userData = {
            name: "Some name",
            email: "some_email6@email.com",
            password: "asd12345",
            confirmPassword: "asd12345"
        };
        const api = new TestAuthAPI(userData, url);
        
        await api.registerUser();
        
        await confirmUserEmail(userData.email);
        
        api.userData.email = "aaaaa@com";
        const loginRes = await api.loginGetJwt();
        
        await api.deleteUser();
        
        expect(!loginRes.loggedIn).toBe(true);
    });
});
