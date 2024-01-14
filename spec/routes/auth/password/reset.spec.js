import dotenv from "dotenv";

import AuthAPI from "../../../../src/api/auth/AuthAPI.js";

describe("Start password reset process", () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    it('Successfully started', async function() {
        // Fast setup
        const api = AuthAPI.createAndLogin();
        console.log(`User: `, api.userData);
        
        
        
        // Delete user
        await api.deleteUser();
        
        expect(false).toBe(true);
    });
});
