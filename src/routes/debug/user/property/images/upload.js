import express from "express";

const uploadRouter = express.Router();

uploadRouter.get("/upload", async (req, res) => {
    try {
        
        const DebugPropertyImageUpload = req.models.DebugPropertyImageUpload;
        
        // Get recent entries
        // Some courses take more than 8+ entries
        const debugModel = await DebugPropertyImageUpload.findAll({
            limit: 30,
            // Optional where conditions
            // Maybe for filters, but not now really
            where: {
            },
            order: [
                [ 'createdAt', 'DESC' ],
                [ 'actionCourseUuid', 'DESC' ]
            ]
        });
        // console.log(`Debug model: `, debugModel);
        
        return res.render("debug/user/property/images/upload", {
            debugEntries: debugModel,
        });
    } catch(err) {
        console.error(err);
        return;
    }
})

export default uploadRouter;
