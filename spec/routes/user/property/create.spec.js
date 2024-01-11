import dotenv from "dotenv";

import { serverUrl } from "../../../../src/controllers/env/env.js";
import AuthAPI from "../../../../src/api/auth/AuthAPI.js";
import PropertyAPI from "../../../../src/api/user/property/PropertyAPI.js";

describe("Create property", () => {
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
    const api = new AuthAPI(userData, url);
    
    // Run asynchronous work before the tests start
    beforeEach(async function() {
        // Register, and login
        await api.createLoginGetInstance();
    });
    
    const propertyApi = new PropertyAPI(api.instance);
    
    it('Successful property creation', async function() {
        
        // Create some property
        const property = {
            title: "Luxury house",
            description: "This is a luxury house",
            rooms: 3,
            parking: 2,
            bathrooms: 3,
            street: 'Norris Road 1223',
            latitude: 35.0831751,
            longitude: -90.022207,
            priceId: 5,
            categoryId: 4,
            image: "",
            published: true,
            userId: this.userId,
        };
        const propertyCreatedResult = propertyApi.createProperty();
        
        // Find the property
        
        // Now delete the property
        
        
        expect(propertyCreatedResult && propertyCreatedResult.propertyCreated).toBe(true);
    });
});
