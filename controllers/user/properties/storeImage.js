

const storeImage = async (req, res) => {
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
    if(req.user.id.to_string() !== property.id.to_string()) {
        return res.redirect("/user/property/admin");
    }
    
    try {
        // Store image
        property.image = req.file.filename;
        
        // Publish property
        property.published = 1;
        
        // Store
        await property.save();
        
    } catch(err) {
        console.error(err);
    }
}

export default storeImage;
