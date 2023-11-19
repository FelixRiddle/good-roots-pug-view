import Property from "../../../models/Property.js";

const setImage = async (req, res) => {
    const { id } = req.params;
    
    // Validate that the property exists
    const property = await Property.findByPk(id);
    
    if(!property) {
        console.log(`The requested property doesn't exists!`);
        return res.redirect("/user/property/admin");
    }
    
    // Validate that the property is not published
    if(property.published) {
        console.log(`This property has already been published`);
        return res.redirect("/user/property/admin");
    }
    
    // Validate that the property belongs to the user that made the request
    if(req.user.id.to_string() !== property.ownerId.to_string()) {
        console.log(`The user doesn't own this property going back...`);
        console.log(`User: `, req.user.name);
        return res.redirect("/user/property/admin");
    }
    
    return res.render("/user/property/set-image", {
        page: `Set images for ${property.title}`
    });
}

export default setImage;
