import dotenv from "dotenv";

import { serverUrl } from "../../../src/controllers/env/env.js";
import TestAuthAPI from "../../../src/api/auth/TestAuthAPI.js";
import { confirmUserEmail } from "../auth/authUtils.js";

describe("Delete user", () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Create user data
    const userData = {
        name: "Some name",
        email: "some_email2@email.com",
        password: "asd12345",
        confirmPassword: "asd12345"
    };
    
    const url = serverUrl();
    const api = new TestAuthAPI(userData, url);
    
    it('Delete user', async function() {
        await api.registerUser();
        
        await confirmUserEmail(userData.email);
        
        await api.loginGetJwt();
        
        const deleteRes = await api.deleteUser();
        
        expect(deleteRes.userDeleted).toBe(true);
    });
});
