import { body } from "express-validator";
import formFetchAllValues from "../../../lib/form/formFetchAllValues.js";

// Get submit button
let submitBtn = document.getElementById("createProperty");
if(!submitBtn) {
    // An error has occurred
    console.log(`Couldn't find submit button!`);
}

// Hook the click event
submitBtn.onclick("click", (event) => {
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
    }
    
    // TODO: Frontend validation
    
    // body("title")
    //     .notEmpty().withMessage("The title is required")
    //     // Someone might be messing with endpoints so you always have to set a limit no matter what field is
    //     .isLength({
    //         max: 64
    //     }).withMessage("Title can't be longer than 64 characters"),
    // body("description")
    //     .notEmpty().withMessage("Description is required")
    //     .isLength({
    //         max: 512,
    //     }).withMessage("Description is too large"),
    // body("category")
    //     .isNumeric().withMessage("Select a category")
    //     .notEmpty().withMessage(friendly_message)
    //     .isLength({
    //         max: 16
    //     }).withMessage(friendly_message),
    // body("price")
    //     .isNumeric().withMessage("Select a price")
    //     .notEmpty().withMessage(friendly_message)
    //     .isLength({
    //         max: 16
    //     }).withMessage(friendly_message),
    // // These are all numbers
    // body("rooms")
    //     .isNumeric().withMessage("Select rooms")
    //     .notEmpty().withMessage(friendly_message)
    //     .isLength({
    //         max: 16
    //     }).withMessage(friendly_message),
    // body("parking")
    //     .isNumeric().withMessage("Select parking spots quantity")
    //     .notEmpty().withMessage(friendly_message)
    //     .isLength({
    //         max: 16
    //     }).withMessage(friendly_message),
    // body("bathrooms")
    //     .isNumeric().withMessage("Select number of bathrooms")
    //     .notEmpty().withMessage(friendly_message)
    //     .isLength({
    //         max: 16
    //     }).withMessage(friendly_message),
    // // Property location
    // body("latitude")
    //     .notEmpty().withMessage(property_location),
    // body("longitude")
    //     .notEmpty().withMessage(property_location),
    // body("street")
    //     .notEmpty().withMessage(property_location)
    
    // Post data
    axios.post('/create', {
        property: resultObject,
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
});
