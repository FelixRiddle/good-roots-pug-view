import dotenv from "dotenv";

import { serverUrl } from "../../../../src/controllers/env/env.js";
import AuthAPI from "../../../../src/api/auth/AuthAPI.js";
import PropertyAPI from "../../../../src/api/user/property/PropertyAPI.js";

describe("Edit", () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Create user data
    const userData = {
        name: "Test Edit Schmidt",
        email: "test_edit_property_email@email.com",
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
    
    it('Success property edit', async function() {
        const propertyApi = new PropertyAPI(api.instance);
        
        // Create some property
        const property = {
            title: "Shack",
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
            // This is here but in the endpoint it does nothing
            published: true,
            userId: this.userId,
        };
        await propertyApi.createProperty(property);
        
        // Get property
        const properties = await propertyApi.getAll();
        const serverProperty = properties.properties[0];
        console.log(`Property: `, serverProperty);
        
        // Update its title
        const newPropertyTitle = "Luxury House";
        serverProperty.title = newPropertyTitle;
        console.log(`New title: `, serverProperty.title);
        
        // Update it
        const editPropertyRes = await propertyApi.editPropertyById(serverProperty.id, serverProperty);
        console.log(`Edit property res: `, editPropertyRes);
        
        expect(editPropertyRes.updated).toBe(true);
    });
    
    it('Title updated', async () => {
        const propertyApi = new PropertyAPI(api.instance);
        
        // Create some property
        const property = {
            title: "Shack",
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
            // This is here but in the endpoint it does nothing
            published: true,
            userId: this.userId,
        };
        await propertyApi.createProperty(property);
        
        // Get property
        const properties = await propertyApi.getAll();
        const serverProperty = properties.properties[0];
        console.log(`Property: `, serverProperty);
        
        // Update its title
        const newPropertyTitle = "Luxury House";
        serverProperty.title = newPropertyTitle;
        console.log(`New title: `, serverProperty.title);
        
        // Update it
        await propertyApi.editPropertyById(serverProperty.id, serverProperty);
        
        // Fetch again
        const updatedProperties = await propertyApi.getAll();
        const updatedProperty = updatedProperties.properties[0];
        console.log(`Updated property: `, updatedProperty);
        
        // Now delete every user property
        await propertyApi.deleteAll();
        
        expect(updatedProperty.title === newPropertyTitle).toBe(true);
    })
});
