import dotenv from "dotenv";

import { serverUrl } from "../../../src/controllers/env/env.js";
import TestAuthAPI from "../../../src/api/auth/AuthAPI.js";
import { confirmUserEmail } from "./authUtils.js";

describe("User register", () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    const url = serverUrl();
    
    // Successful registration
    it('Successful user registration', async function() {
        // Create user data
        const userData = {
            name: "Some name",
            email: "some_email@email.com",
            password: "asd12345",
            confirmPassword: "asd12345"
        };
        
        const api = new TestAuthAPI(userData, url);
        
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
    
    // --- Password ---
    // Short user password
    it("Short user password on register", async function() {
        // Create user data
        const userData = {
            name: "Some name",
            email: "some_email3@gmail.com",
            password: "asd",
            confirmPassword: "asd"
        };
        
        const api = new TestAuthAPI(userData, url);
        
        // The user will not be able to register so we can skip deletion
        const registerRes = await api.registerUser();
        const registered = registerRes.userRegistered;
        
        // If it's false, then the user is not registered
        // Flip the bit to check against true
        expect(!registered).toBe(true);
    });
    
    // Longer than 64 characters password
    it("Password too large", async function() {
        // Create user data
        const userData = {
            name: "Some name",
            email: "some_email4@gmail.com",
            password: "Woh0dgvEByn6skV1BpUvx7X7XLio0HdaHtrMpacGBTCFImpjHUTb5fERCWkvV5A2A",
            confirmPassword: "Woh0dgvEByn6skV1BpUvx7X7XLio0HdaHtrMpacGBTCFImpjHUTb5fERCWkvV5A2A"
        };
        
        const api = new TestAuthAPI(userData, url);
        
        // The user will not be able to register so we can skip deletion
        const registerRes = await api.registerUser();
        const registered = registerRes.userRegistered;
        
        // If it's false, then the user is not registered
        // Flip the bit to check against true
        expect(!registered).toBe(true);
    });
    
    // Confirm password mismatch
    it("Password too large", async function() {
        // Create user data
        const userData = {
            name: "Some name",
            email: "some_email5@gmail.com",
            password: "asdf1234",
            confirmPassword: "asdf12345"
        };
        
        const api = new TestAuthAPI(userData, url);
        
        // The user will not be able to register so we can skip deletion
        const registerRes = await api.registerUser();
        const registered = registerRes.userRegistered;
        
        // If it's false, then the user is not registered
        // Flip the bit to check against true
        expect(!registered).toBe(true);
    });
    
    // --- Email ---
    it("Bad email", async function() {
        // Create user data
        const userData = {
            name: "Some name",
            // Doesn't have domain name
            email: "some_email6@.com",
            password: "asdf1234",
            confirmPassword: "asdf1234"
        };
        
        const api = new TestAuthAPI(userData, url);
        
        // The user will not be able to register so we can skip deletion
        const registerRes = await api.registerUser();
        const registered = registerRes.userRegistered;
        
        // If it's false, then the user is not registered
        // Flip the bit to check against true
        expect(!registered).toBe(true);
    });
    
    // --- Name ---
    it("Null name", async function() {
        // Create user data
        const userData = {
            name: "",
            email: "some_email5@gmail.com",
            password: "asdf1234",
            confirmPassword: "asdf1234"
        };
        
        const api = new TestAuthAPI(userData, url);
        
        // The user will not be able to register so we can skip deletion
        const registerRes = await api.registerUser();
        const registered = registerRes.userRegistered;
        
        // If it's false, then the user is not registered
        // Flip the bit to check against true
        expect(!registered).toBe(true);
    });
    
    it("Name too short", async function() {
        // Create user data
        const userData = {
            name: "aa",
            email: "some_email5@gmail.com",
            password: "asdf1234",
            confirmPassword: "asdf1234"
        };
        
        const api = new TestAuthAPI(userData, url);
        
        // The user will not be able to register so we can skip deletion
        const registerRes = await api.registerUser();
        const registered = registerRes.userRegistered;
        
        // If it's false, then the user is not registered
        // Flip the bit to check against true
        expect(!registered).toBe(true);
    });
    
    it("Name too long", async function() {
        // Create user data
        const userData = {
            // Name too long
            name: "CsSAVM7muEYXrEkZd6n8T1SoPoxgMNxsZ2UJSlthE6BPSCmeX72jU5EHULhn7rq7rAUNYtGeTOeW7URRra4fQ5DNQVF0iMYv80wkbU9I7bv0T30rvTlLkJKTufo0FPgqA",
            email: "some_email5@gmail.com",
            password: "asdf1234",
            confirmPassword: "asdf1234"
        };
        
        const api = new TestAuthAPI(userData, url);
        
        // The user will not be able to register so we can skip deletion
        const registerRes = await api.registerUser();
        const registered = registerRes.userRegistered;
        
        // If it's false, then the user is not registered
        // Flip the bit to check against true
        expect(!registered).toBe(true);
    });
});
