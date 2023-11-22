import Category from "../../../models/Category.js";
import Price from "../../../models/Price.js";
import Property from "../../../models/Property.js";

// Control panel for user properties
const admin = async (req, res) => {
    
    const { id } = req.user;
    
    console.log(`ID: ${id}`);
    
    const properties = await Property.findAll({
        where: {
            id,
        },
        include: [
            { model: Category, as: 'category' }
        ]
    });
    
    return res.render("user/property/admin", {
        page: "My Properties",
        properties,
    });
}

export default admin;
