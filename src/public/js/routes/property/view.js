import { createAxiosInstance } from "felixriddle.good-roots-ts-api";

import CarouselView from "../../lib/property/views/CarouselView.js";
import PropertyMapView from "../../property/view/PropertyMapView.js";

const carouselView = new CarouselView();

const propertyMapView = new PropertyMapView();

(async() => {
    // Hook on submit
    const submitButton = document.getElementById("contact:seller:submit");
    if(submitButton) {
        submitButton.addEventListener("click", async() => {
            // Get property id field
            const propertyIdField = document.getElementById("contact:seller:propertyId");
            if(!propertyIdField) {
                return;
            }
            const propertyId = propertyIdField.value;
            
            // Get message and send
            const message = document.getElementById("contact:seller:message");
            if(message) {
                console.log(`Message field ok`);
                
                // It's not necessary to get the cookies here
                // (I forgot about that)
                
                // Create axios instance
                const url = window.location.origin;
                const instance = createAxiosInstance(url);
                
                // Send request
                await instance.post("/user/property_messages", {
                    propertyId,
                    message: message.value,
                });
            } else {
                console.error("No message field found");
            }
        });
    }
})();
