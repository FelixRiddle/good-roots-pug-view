// import dotenv from "dotenv";

// import { serverUrl } from "../../../../src/controllers/env/env.js";
// import { AuthAPI, confirmUserEmailWithPrivateKey } from "express-authentication";
// import PropertyAPI from "../../../../src/api/user/property/PropertyAPI.js";

// describe("Delete", () => {
//     // Setup dotenv
//     dotenv.config({
//         path: ".env"
//     });
    
//     // Create user data
//     const userData = {
//         name: "Delete property",
//         email: "delete_property_tests@email.com",
//         password: "asd12345",
//         confirmPassword: "asd12345"
//     };
    
//     const url = serverUrl();
//     const api = new AuthAPI(userData, url);
    
//     // Run asynchronous work before the tests start
//     beforeEach(async function() {
//         // Register, and login
//         await api.createLoginGetInstance();
//     });
    
//     afterEach(async () => {
//         await api.deleteUser();
//     });
    
//     it('Delete property', async function() {
//         const propertyApi = new PropertyAPI(api.instance);
        
//         // Create some property
//         const property = {
//             title: "Luxury house",
//             description: "This is a luxury house",
//             rooms: 3,
//             parking: 2,
//             bathrooms: 3,
//             street: 'Norris Road 1223',
//             latitude: 35.0831751,
//             longitude: -90.022207,
//             priceId: 5,
//             categoryId: 4,
//             image: "",
//             // This is here but in the endpoint it does nothing
//             published: true,
//             userId: this.userId,
//         };
//         await propertyApi.createProperty(property);
        
//         // Now delete every user property
//         await propertyApi.deleteAll();
        
//         const properties = await propertyApi.getAll();
        
//         expect(properties.properties.length == 0).toBe(true);
//     });
// });
