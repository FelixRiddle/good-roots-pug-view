import dotenv from "dotenv";

import { serverUrl } from "../../../../src/controllers/env/env.js";
import { AuthAPI, confirmUserEmailWithPrivateKey } from "express-authentication";
import PropertyAPI from "../../../../src/api/user/property/PropertyAPI.js";

describe("Create property", () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Create user data
    const userData = {
        name: "Create property",
        email: "create_property_tests@email.com",
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
    
    afterEach(async () => {
        await api.deleteUser();
    });
    
    it('Successful property creation', async function() {
        const propertyApi = new PropertyAPI(api.instance);
        
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
            // This is here but in the endpoint it does nothing
            published: true,
            userId: this.userId,
        };
        const propertyCreatedResult = await propertyApi.createProperty(property);
        
        // Now delete every user property
        await propertyApi.deleteAll();
        
        expect(propertyCreatedResult && propertyCreatedResult.propertyCreated).toBe(true);
    });
    
    // Test wrong ones
    // There are too many possibilities 😩 I will test some of them 
    it('Bad title', async function() {
        const propertyApi = new PropertyAPI(api.instance);
        
        // Create some property
        const property = {
            title: "L",
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
        const propertyCreatedResult = await propertyApi.createProperty(property);
        
        // Now delete every user property
        await propertyApi.deleteAll();
        
        expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
    });
    
    it('Bad description', async function() {
        const propertyApi = new PropertyAPI(api.instance);
        
        // Create some property
        const property = {
            title: "Luxury House",
            description: "This",
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
        const propertyCreatedResult = await propertyApi.createProperty(property);
        
        // Now delete every user property
        await propertyApi.deleteAll();
        
        expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
    });
    
    it('Bad rooms quantity', async function() {
        const propertyApi = new PropertyAPI(api.instance);
        
        // Create some property
        const property = {
            title: "Luxury house",
            description: "This is a luxury house",
            rooms: 10,
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
        const propertyCreatedResult = await propertyApi.createProperty(property);
        
        // Now delete every user property
        await propertyApi.deleteAll();
        
        expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
    });
    
    it('Bad parking quantity', async function() {
        const propertyApi = new PropertyAPI(api.instance);
        
        // Create some property
        const property = {
            title: "Luxury house",
            description: "This is a luxury house",
            rooms: 4,
            parking: 5,
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
        const propertyCreatedResult = await propertyApi.createProperty(property);
        
        // Now delete every user property
        await propertyApi.deleteAll();
        
        expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
    });
    
    it('Bad bathrooms quantity', async function() {
        const propertyApi = new PropertyAPI(api.instance);
        
        // Create some property
        const property = {
            title: "Luxury house",
            description: "This is a luxury house",
            rooms: 4,
            parking: 3,
            bathrooms: 5,
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
        const propertyCreatedResult = await propertyApi.createProperty(property);
        
        // Now delete every user property
        await propertyApi.deleteAll();
        
        expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
    });
    
    it('Bad price quantity', async function() {
        const propertyApi = new PropertyAPI(api.instance);
        
        // Create some property
        const property = {
            title: "Luxury house",
            description: "This is a luxury house",
            rooms: 4,
            parking: 3,
            bathrooms: 5,
            street: 'Norris Road 1223',
            latitude: 35.0831751,
            longitude: -90.022207,
            priceId: 11,
            categoryId: 4,
            image: "",
            // This is here but in the endpoint it does nothing
            published: true,
            userId: this.userId,
        };
        const propertyCreatedResult = await propertyApi.createProperty(property);
        
        // Now delete every user property
        await propertyApi.deleteAll();
        
        expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
    });
    
    it('Bad category quantity', async function() {
        const propertyApi = new PropertyAPI(api.instance);
        
        // Create some property
        const property = {
            title: "Luxury house",
            description: "This is a luxury house",
            rooms: 4,
            parking: 3,
            bathrooms: 5,
            street: 'Norris Road 1223',
            latitude: 35.0831751,
            longitude: -90.022207,
            priceId: 4,
            categoryId: 8,
            image: "",
            // This is here but in the endpoint it does nothing
            published: true,
            userId: this.userId,
        };
        const propertyCreatedResult = await propertyApi.createProperty(property);
        
        // Now delete every user property
        await propertyApi.deleteAll();
        
        expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
    });
    
    it('Street is not falsy', async function() {
        const propertyApi = new PropertyAPI(api.instance);
        
        // Create some property
        const property = {
            title: "Luxury house",
            description: "This is a luxury house",
            rooms: 4,
            parking: 3,
            bathrooms: 3,
            street: '',
            latitude: 35.0831751,
            longitude: -90.022207,
            priceId: 5,
            categoryId: 4,
            image: "",
            // This is here but in the endpoint it does nothing
            published: true,
            userId: this.userId,
        };
        const propertyCreatedResult = await propertyApi.createProperty(property);
        
        // Now delete every user property
        await propertyApi.deleteAll();
        
        expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
    });
});
