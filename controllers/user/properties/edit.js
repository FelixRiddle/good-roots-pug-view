import Property from "../../../models/Property.js";

const edit = async (req, res) => {
    
    const { id } = req.params;
    
    // Check that property exists
    const property = Property.findByPk(id);
    
    if(!property) {
        return res.redirect("/admin");
    }
    
    // Check that person that accessed this url
    // is the person that owns this property
    if(property.userId.toString() !== req.user.id.toString()) {
        return res.redirect("/admin");
    }
    
    // Get price and category
    const [
        categories,
        prices,
    ] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
    ]);
    
    return res.render(
        "user/property/edit", {
        page: "Edit property",
        categories,
        prices,
        property: req.body,
    });
}

export default edit;
