import express from "express";

const locationRouter = express.Router();

// Fetch location service api key
// Disabled for now
// locationRouter.use("/apiKey", async (req, res) => {
//     try {
//         let apiKey = process.env.ARCGIS_KEY;
        
//         return res.send({
//             apiKey,
//         });
//     } catch(err) {
//         console.log(err);
//         return res.send({
//             messages: [{
//                 message: "Error when trying to fetch the api key",
//                 error: true,
//             }]
//         })
//     }
// });

export default locationRouter;
