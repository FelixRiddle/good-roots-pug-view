import Price from "../../../models/Price.js";
import Property from "../../../models/Property.js";

const edit = async (req, res) => {
    console.log(`Entered edit mode`);
    console.log("Body: ", req.body);
    
    const { id } = req.params;
    
    // Check that property exists
    const property = Property.findByPk(id);
    
    // Get price and category
    const [
        categories,
        prices,
    ] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
    ]);
    
    try {
        if(!property) {
            return res.redirect("/admin");
        }
        
        // Check that person that accessed this url
        // is the person that owns this property
        if(property.userId.toString() !== req.user.id.toString()) {
            return res.redirect("/admin");
        }
        
        return res.render(
            "user/property/edit", {
            page: `Edit property: ${property.title}`,
            categories,
            prices,
            property: req.body,
        });
    } catch(err) {
        console.log(err);
        
        return res.render(
            "user/property/edit", {
            page: `Edit property: ${property.title}`,
            categories,
            prices,
            property: req.body,
        });
    }
}

export default edit;
