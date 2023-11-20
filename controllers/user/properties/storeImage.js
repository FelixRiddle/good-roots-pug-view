import Property from "../../../models/Property.js";

const storeImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Validate that the property exists
        const property = await Property.findByPk(id);
        
        if(!property) {
            return res.redirect("/user/property/admin");
        }
        
        // Validate that the property is not published
        if(property.published) {
            return res.redirect("/user/property/admin");
        }
        
        // Validate that the property belongs to the own who made the request
        if(req.user) {
            if(req.user.id.to_string() !== property.ownerId.to_string()) {
                return res.redirect("/user/property/admin");
            }
        } else {
            console.log(`Req user doesn't exists`);
            return res.redirect("/user/property/admin");
        }
        
        // Store image
        property.image = req.file.filename;
        
        // Publish property
        property.published = 1;
        
        // Store
        await property.save();
        
        next();
    } catch(err) {
        console.error(err);
        return res.redirect("/user/property/admin");
    }
}

export default storeImage;
