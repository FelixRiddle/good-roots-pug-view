import dotenv from "dotenv";

import AuthAPI from "../../../../src/api/auth/AuthAPI.js";
import ResetPasswordAPI from "../../../../src/api/auth/ResetPasswordAPI.js";

describe("Start password reset process", () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    it('Successfully started', async function() {
        // Fast setup
        const api = AuthAPI.createAndLogin();
        
        const passwordApi = new ResetPasswordAPI(api.userData);
        const resetRes = await passwordApi.resetPassword();
        console.log(`Reset res: `, resetRes);
        
        // Delete user
        await api.deleteUser();
        
        expect(resetRes.resetEmailSent).toBe(true);
    });
});
