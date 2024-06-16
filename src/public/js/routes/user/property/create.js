import axios from "axios";

import { formFetchAllValues } from "felixriddle.checkpoint";

import validateProperty from "../../../validation/validateProperty.js";
import MarkPositionManager from "../../../lib/map/MarkPositionManager.js";
import rootLocation from "../../../global/location.js";

const siteUrl = rootLocation();
let markerPosition = new MarkPositionManager();

/**
 * Position change callback
 * 
 * @param {Object} newPosition The new position, contains tons of information
 */
let positionChangeCallback = (newPosition) => {
    if(!newPosition) {
        console.warn("New position is undefined!");
        return;
    }
    
    // We have to set street, latitude and longitude.
    // Street
    let streetName = `${newPosition.streetName} ${newPosition.streetNumber}`;
    let street = document.getElementById("street");
    if(street) {
        street.value = streetName;
    }
    
    // Display street name to the user
    let showStreet = document.getElementById("show_street");
    if(showStreet) {
        showStreet.innerHTML = streetName;
    }
    
    // Latitude
    let latitude = document.getElementById("latitude");
    if(latitude) {
        latitude.value = newPosition.latitude;
    }
    
    // Longitude
    let longitude = document.getElementById("longitude");
    if(longitude) {
        longitude.value = newPosition.longitude;
    }
}

markerPosition.setPositionChangeCallback(positionChangeCallback);

// On button click send request
hookRequestOnButtonClick();

/**
 * Send a request on button click
 * 
 * @returns 
 */
function hookRequestOnButtonClick() {
    // Get submit button
    let submitBtn = document.getElementById("createProperty");
    if(!submitBtn) {
        // An error has occurred
        console.error(`Couldn't find submit button!`);
        return;
    }
    
    // Hook the click event
    submitBtn.addEventListener("click", async (event) => {
        
        // Post on create
        try {
            event.preventDefault();
            
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
            let property = formFetchAllValues(inputElementsNames);
            if(!property) {
                console.log(`Couldn't fetch form values!`);
                
                // Get outta here
                return;
            }
            
            // Parse values
            property.categoryId = parseInt(property.categoryId);
            property.priceId = parseInt(property.priceId);
            property.bathrooms = parseInt(property.bathrooms);
            property.parking = parseInt(property.parking);
            property.rooms = parseInt(property.rooms);
            
            // Place
            property.latitude = parseFloat(property.latitude);
            property.longitude = parseFloat(property.longitude);
            
            // Check that validation passes
            let result = validateProperty(property);
            if(result.length > 0) {
                console.log(`Validation didn't pass`);
                return result;
            }
            
            // Create axios instance
            const instance = axios.create({
                baseUrl: siteUrl,
                timeout: 1000,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            // console.log(`Post property data`);
            const res = await instance.post(`/user/property/create`, {
                property,
            }).then((res) => {
                return res.data;
            })
                .catch((err) => console.error(err));
            
            const nextUrl = res.nextUrl;
            const url = `${siteUrl}${nextUrl}`;
            
            window.location.href = url;
        } catch(err) {
            console.log(`Error: `, err);
        }
    });
}
