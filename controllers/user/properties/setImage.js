import Property from "../../../models/Property.js";

const setImage = async (req, res) => {
    console.log(`Body: `, req.body);
    
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
    
    // Validate that the property belongs to the user that made the request
    if(req.body.user.id.to_string() !== property.id.to_string()) {
        return res.redirect("/user/property/admin");
    }
    
    return res.render("/user/property/set-image", {
        page: `Set images for ${property.title}`
    });
}

export default setImage;
