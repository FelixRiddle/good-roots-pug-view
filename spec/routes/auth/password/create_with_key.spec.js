import dotenv from "dotenv";
import generator from 'generate-password';

import AuthAPI from "../../../../src/api/auth/AuthAPI.js";
import ResetPasswordAPI from "../../../../src/api/auth/ResetPasswordAPI.js";
import ResetPasswordPrivateKey from "../../../../src/controllers/env/private/ResetPasswordPrivateKey.js";

describe("Create with key", () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Haha I can't believe I wrote this 😂😂😂
    // it('Successfully success', async function() {
    it('Successful password re-creation', async function() {
        // Fast setup
        const api = await AuthAPI.createAndLogin();
        
        const passwordApi = new ResetPasswordAPI(api.userData);
        await passwordApi.resetPassword();
        
        // Clone data and change password
        const newUserData = JSON.parse(JSON.stringify(api.userData));
        // Setup user
        const newUserPassword = generator.generate({
            length: 10,
            numbers: true
        });
        newUserData.password = newUserPassword;
        newUserData.confirmPassword = newUserPassword;
        
        // Change api data
        passwordApi.userData = newUserData;
        
        const privKeyApi = new ResetPasswordPrivateKey();
        const createPasswordResponse = await passwordApi.createWithKey(privKeyApi.loadLocally());
        
        // Delete user
        // TODO: Hmmm, after changing password it should log out from everywhere right?
        await api.deleteUser();
        
        expect(createPasswordResponse.updated).toBe(true);
    });
        
    // Check if we can login with the new password
});
