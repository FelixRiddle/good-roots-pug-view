// /**
//  * Edit endpoint
//  * 
//  * For data validation it uses the same as create endpoint so there's no need to test that
//  */
// import dotenv from "dotenv";

// import { serverUrl } from "../../../../src/controllers/env/env.js";
// import { AuthAPI, confirmUserEmailWithPrivateKey } from "express-authentication";
// import PropertyAPI from "../../../../src/api/user/property/PropertyAPI.js";

// // For data validation it uses the same as create endpoint so there's no need to test that
// describe("Edit", () => {
//     // Setup dotenv
//     dotenv.config({
//         path: ".env"
//     });
    
//     // Create user data
//     const userData = {
//         name: "Test Edit Schmidt",
//         email: "test_edit_property_email@email.com",
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
    
//     // Run code after each test is complete
//     afterEach(async () => {
//         await api.deleteUser();
//     });
    
//     // For data validation it uses the same as create endpoint so there's no need to test that
//     it('Success property edit', async function() {
//         const propertyApi = new PropertyAPI(api.instance);
        
//         // Create some property
//         const property = {
//             title: "Shack",
//             description: "Success property edit",
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
        
//         // Get property
//         const properties = await propertyApi.getAll();
//         const serverProperty = properties.properties[0];
        
//         // Update its title
//         const newPropertyTitle = "Luxury House";
//         serverProperty.title = newPropertyTitle;
        
//         // Update it
//         const editPropertyRes = await propertyApi.editPropertyById(serverProperty.id, serverProperty);
        
//         // Delete property
//         await propertyApi.deleteAll();
        
//         expect(editPropertyRes.updated).toBe(true);
//     });
    
//     it('Title updated', async () => {
//         const propertyApi = new PropertyAPI(api.instance);
        
//         // Create some property
//         const property = {
//             title: "Shack",
//             description: "Title updated",
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
//         };
//         await propertyApi.createProperty(property);
        
//         // Get property
//         // TODO: This has failed once for some reason.
//         const properties = await propertyApi.getAll();
//         const serverProperty = properties.properties[0];
        
//         // Update its title
//         const newPropertyTitle = "Title updated";
//         serverProperty.title = newPropertyTitle;
        
//         // Update it
//         await propertyApi.editPropertyById(serverProperty.id, serverProperty);
        
//         // Fetch again
//         const updatedProperties = await propertyApi.getAll();
//         const updatedProperty = updatedProperties.properties[0];
        
//         // Now delete every user property
//         await propertyApi.deleteAll();
        
//         expect(updatedProperty.title === newPropertyTitle).toBe(true);
//     });
// });
