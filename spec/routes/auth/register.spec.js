import { serverUrl } from "../../../src/config/baseUrl.js";
import AuthenticationAPI from "../../../src/public/js/lib/auth/AuthenticationAPI.js";

describe("auth/register", () => {
    // Create user data
    const userData = {
        name: "Some name",
        email: "some_email1234@email.com",
        password: "asd12345",
        confirmPassword: "asd12345"
    };
    
    const api = new AuthenticationAPI(userData, serverUrl());
    
    it('Register user', async function() {
        const data = await api.registerUser();
        
        // Now delete user, because we only need to check if register was successful
        const res = await api.loginUser();
        console.log(`Login response: `, res.data);
        
        // This is practically the same as jest
        expect(data.userRegistered).toBe(true);
    });
});
