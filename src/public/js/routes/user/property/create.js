import axios from "axios";
import { Validator, formFetchAllValues } from "felixriddle.checkpoint";

// Get submit button
let submitBtn = document.getElementById("createProperty");
if(!submitBtn) {
    // An error has occurred
    console.log(`Couldn't find submit button!`);
}

// Hook the click event
submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    
    console.log(`The user clicked the button.`);
    
    // Every input element name
    let inputElementsNames = [
        "title",
        "description",
        "rooms",
        "parking",
        "bathrooms",
        "street",
        "latitude",
        "longitude",
        "priceId",
        "categoryId",
    ];
    
    // Take the form and fetch every value from the names
    let resultObject = formFetchAllValues(inputElementsNames);
    if(resultObject) {
        console.log(`Fetch form values Ok`);
    } else {
        console.log(`Couldn't fetch form values!`);
        
        // Get outta here
        return;
    }
    
    // Parse values
    resultObject.categoryId = parseInt(resultObject.categoryId);
    resultObject.priceId = parseInt(resultObject.priceId);
    resultObject.bathrooms = parseInt(resultObject.bathrooms);
    resultObject.parking = parseInt(resultObject.parking);
    resultObject.rooms = parseInt(resultObject.rooms);
    
    // Place
    resultObject.latitude = parseFloat(resultObject.latitude);
    resultObject.longitude = parseFloat(resultObject.longitude);
    
    console.log(`Property parsed: `, resultObject);
    
    // Frontend validation
    let idBasedScope = "id_based";
    let coordinateScope = "coordinate_scope";
    let val = new Validator()
        // Title scope    
        .createScope("title", "title", resultObject.title)
            .isNotFalsy()
            .lengthRange(3, 128)
        // Description scope
        .createScope("description", "description", resultObject.description)
            .isNotFalsy()
            .lengthRange(10, 512)
        // Categories and price
        .createScope(idBasedScope, "categoryId", resultObject.categoryId)
            .isNotFalsy()
            .isInt()
            .numRange(0, 20)
        // Others
        .useScope(idBasedScope, "priceId", resultObject.priceId)
        .useScope(idBasedScope, "rooms", resultObject.rooms)
        .useScope(idBasedScope, "parking", resultObject.parking)
        .useScope(idBasedScope, "bathrooms", resultObject.bathrooms)
        .createScope(coordinateScope, "latitude", resultObject.latitude)
            .isNotFalsy()
            .isFloat()
        .useScope(coordinateScope, "longitude", resultObject.longitude)
        .createScope("street", "street", resultObject.street)
            .isNotFalsy();
    
    // Check that validation passes
    let result = val.validate();
    if(result.length > 0) {
        console.log(`Errors: `, result);
        return;
    }
    
    // Post data
    await axios.post('/create', {
        property: resultObject,
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
});
