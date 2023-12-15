import express from "express";
import NodeGeocoder from "node-geocoder";

const reverseRouter = express.Router();

reverseRouter.use("/reverse", async (req, res) => {
    try {
        // Validate that the required fields exist
        if(req.body.lat === undefined || req.body.lng === undefined) {
            return res.send({
                messages: [{
                    message: "Unexpected error",
                    error: true,
                }]
            });
        }
        
        // Create geocoder and select a provider
        const options = {
            provider: 'google',
            apiKey: process.env.GOOGLE_API_KEY,
        };
        const geocoder = NodeGeocoder(options);
        
        // Reverse geocode the location
        const response = await geocoder.reverse({
            lat: req.body.lat,
            lon: req.body.lng,
        })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.log(`Error when performing reverse geocoding: `, err);
                return undefined;
            });
        
        // Send back the data
        if(response) {
            return res.send({
                response
            });
        } else {
            // Error
            return res.send({
                messages: [{
                    message: "Couldn't fetch the location of the given coordinates",
                    error: true,
                }]
            });
        }
    } catch(err) {
        console.log(`Error: `);
        console.log(err);
        return res.send({
            messages: [{
                message: "Unexpected error",
                error: true,
            }]
        });
    }
});

export default reverseRouter;
