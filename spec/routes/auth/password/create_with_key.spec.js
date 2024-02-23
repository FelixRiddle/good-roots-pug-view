// import dotenv from "dotenv";
// import generator from 'generate-password';

// import { AuthAPI, ResetPasswordAPI, ResetPasswordPrivateKey, confirmUserEmailWithPrivateKey } from "express-authentication";
// import { serverUrl } from "../../../../src/controllers/env/env.js";

// describe("Create with key", () => {
//     // Setup dotenv
//     dotenv.config({
//         path: ".env"
//     });
    
//     // Haha I can't believe I wrote this 😂😂😂
//     // it('Successfully success', async function() {
//     it('Successful password re-creation', async function() {
//         // Fast setup
//         const api = await AuthAPI.createAndLogin();
        
//         const passwordApi = new ResetPasswordAPI(api.userData);
//         await passwordApi.resetPassword();
        
//         // Clone data and change password
//         const newUserData = JSON.parse(JSON.stringify(api.userData));
//         // Setup user
//         const newUserPassword = generator.generate({
//             length: 10,
//             numbers: true
//         });
//         newUserData.password = newUserPassword;
//         newUserData.confirmPassword = newUserPassword;
        
//         // Change api data
//         passwordApi.userData = newUserData;
        
//         const privKeyApi = new ResetPasswordPrivateKey();
//         const createPasswordResponse = await passwordApi.createWithKey(privKeyApi.loadLocally());
        
//         // Delete user
//         // TODO: Hmmm, after changing password it should log out from everywhere right?
//         await api.deleteUser();
        
//         expect(createPasswordResponse.updated).toBe(true);
//     });
    
//     // Check if we can login with the new password
//     it('Successful re-login with the new password', async function() {
//         // Fast setup
//         const api = await AuthAPI.createAndLogin();
        
//         const passwordApi = new ResetPasswordAPI(api.userData);
//         await passwordApi.resetPassword();
        
//         // Clone data and change password
//         const newUserData = JSON.parse(JSON.stringify(api.userData));
//         // Setup user
//         const newUserPassword = generator.generate({
//             length: 10,
//             numbers: true
//         });
//         newUserData.password = newUserPassword;
//         newUserData.confirmPassword = newUserPassword;
        
//         // Change api data
//         passwordApi.userData = newUserData;
        
//         const privKeyApi = new ResetPasswordPrivateKey();
//         await passwordApi.createWithKey(privKeyApi.loadLocally());
        
//         // --- Try to log in with the new password ---
//         const apiA = new AuthAPI(newUserData, serverUrl());
//         const loginRes = await apiA.loginGetJwt();
        
//         // Delete user
//         // TODO: Hmmm, after changing password it should log out from everywhere right?
//         await api.deleteUser();
        
//         expect(loginRes.loggedIn).toBe(true);
//     });
    
//     it('Password too large', async function() {
//         // Fast setup
//         const api = await AuthAPI.createAndLogin();
        
//         const passwordApi = new ResetPasswordAPI(api.userData);
//         await passwordApi.resetPassword();
        
//         // Clone data and change password
//         const newUserData = JSON.parse(JSON.stringify(api.userData));
//         // Setup user
//         const newUserPassword = generator.generate({
//             // Too large
//             length: 65,
//             numbers: true
//         });
//         newUserData.password = newUserPassword;
//         newUserData.confirmPassword = newUserPassword;
        
//         // Change api data
//         passwordApi.userData = newUserData;
        
//         const privKeyApi = new ResetPasswordPrivateKey();
//         const createPasswordResponse = await passwordApi.createWithKey(privKeyApi.loadLocally());
        
//         // Delete user
//         // TODO: Hmmm, after changing password it should log out from everywhere right?
//         await api.deleteUser();
        
//         expect(!createPasswordResponse.updated).toBe(true);
//     });
    
//     it('Password too short', async function() {
//         // Fast setup
//         const api = await AuthAPI.createAndLogin();
        
//         const passwordApi = new ResetPasswordAPI(api.userData);
//         await passwordApi.resetPassword();
        
//         // Clone data and change password
//         const newUserData = JSON.parse(JSON.stringify(api.userData));
//         // Setup user
//         const newUserPassword = generator.generate({
//             // Too short
//             length: 7,
//             numbers: true
//         });
//         newUserData.password = newUserPassword;
//         newUserData.confirmPassword = newUserPassword;
        
//         // Change api data
//         passwordApi.userData = newUserData;
        
//         const privKeyApi = new ResetPasswordPrivateKey();
//         const createPasswordResponse = await passwordApi.createWithKey(privKeyApi.loadLocally());
        
//         // Delete user
//         // TODO: Hmmm, after changing password it should log out from everywhere right?
//         await api.deleteUser();
        
//         expect(!createPasswordResponse.updated).toBe(true);
//     });
// });
