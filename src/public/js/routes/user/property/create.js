import axios from "axios";
import { Validator, formFetchAllValues } from "felixriddle.checkpoint";

import validateProperty from "../../../validation/validateProperty.js";

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
    
    // Check that validation passes
    let result = validateProperty(resultObject);
    if(result.length > 0) {
        console.log(`Errors: `, result);
        return result;
    }
    console.log(`Validation passed`);
    
    // Post data
    await axios.post('/user/property/create', {
        property: resultObject,
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
});
