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
        console.log(`Data: `, resultObject);
    } else {
        console.log(`Couldn't fetch form values!`);
    }
    
    // TODO: Frontend validation
    let validator = new Validator();
    return;
    
    // Post data
    await axios.post('/create', {
        property: resultObject,
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
});
