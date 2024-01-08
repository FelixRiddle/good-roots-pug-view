import AuthenticationAPI from "../../../src/public/js/lib/auth/AuthenticationAPI.js";

describe("auth/register", () => {
    // Create user data
    const userData = {
        name: "Selena",
        email: "selena@email.com",
        password: "asd12345",
        confirmPassword: "asd12345"
    };
    
    const api = new AuthenticationAPI(userData);
    const result = api.registerUser();
    
    console.log(`Result: `, result);
    // expect(result.userRegistered).toBe(true);
    
    it("The user was registered", function() {
        // This is practically the same as jest
        expect(result.userRegistered).toBe(true);
    });
});
