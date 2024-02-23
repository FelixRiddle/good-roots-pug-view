// import dotenv from "dotenv";

// import { serverUrl } from "../../../src/controllers/env/env.js";
// import { AuthAPI, confirmUserEmailWithPrivateKey } from "express-authentication";

// describe("auth/email", () => {
//     // Setup dotenv
//     dotenv.config({
//         path: ".env"
//     });
    
//     // Create user data
//     const userData = {
//         name: "Some name",
//         email: "some_email1@email.com",
//         password: "asd12345",
//         confirmPassword: "asd12345"
//     };
    
//     const url = serverUrl();
//     const api = new AuthAPI(userData, url);
    
//     it('Confirm email', async function() {
//         await api.registerUser();
        
//         const confirmEmailRes = await confirmUserEmailWithPrivateKey(userData.email);
        
//         await api.loginGetJwt();
        
//         await api.deleteUser();
        
//         expect(confirmEmailRes.emailConfirmed).toBe(true);
//     });
// });
