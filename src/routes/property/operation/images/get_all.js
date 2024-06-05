import express from "express";

const getAllRoutes = express.Router();

getAllRoutes.get("/get_all/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        return res.send({
            messages: [{
                message: "Endpoint not finished",
                error: true,
            }]
        })
    } catch(err) {
        console.error(err);
        return res.send({
            messages: [{
                message: "Unknown error",
                error: true,
            }]
        });
    }
});

export default getAllRoutes;
