import Category from "../../../models/Category.js";
import Price from "../../../models/Price.js";
import Property from "../../../models/Property.js";

// Control panel for user properties
const admin = async (req, res) => {
    
    const { id } = req.user;
    
    console.log(`ID: ${id}`);
    
    // Fetch properties from the database that are owned by this user
    const properties_res = await Property.findAll({
        where: {
            userId: id,
        },
        include: [
            {
                raw: true,
                model: Category,
                as: 'category'
            }, {
                raw: true,
                model: Price,
                as: "price"
            }
        ]
    });
    
    // Thanks sensei for this incredible response
    // https://stackoverflow.com/questions/64546830/sequelize-how-to-eager-load-with-associations-raw-true
    const properties = properties_res.map(x => x.get({ plain: true }))
    
    console.log(`Properties`);
    console.log(properties);
    
    return res.render("user/property/admin", {
        page: "My Properties",
        properties,
    });
}

export default admin;
