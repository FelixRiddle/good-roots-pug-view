import { createAxiosInstance } from "felixriddle.good-roots-ts-api";

import CarouselView from "../../lib/property/views/CarouselView.js";
import PropertyMapView from "../../property/view/PropertyMapView.js";
import { jsonForm } from "../../lib/controller/form.js";

const carouselView = new CarouselView();

const propertyMapView = new PropertyMapView();

(async() => {
    // Hook on submit
    const submitButton = document.getElementById("contact:seller:submit");
    if(submitButton) {
        submitButton.addEventListener("click", async(event) => {
            event.preventDefault();
            
            const formData = jsonForm('contact:seller');
            
            console.log(`Form data: `, formData);
            
            // Create axios instance
            const url = window.location.origin;
            const instance = createAxiosInstance(url);
            
            // Send request
            await instance.post("/user/property_messages", formData);
        });
    }
})();
