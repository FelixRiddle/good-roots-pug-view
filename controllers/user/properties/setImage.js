import Property from "../../../models/Property.js";

const setImage = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`User: `, req.user);
        
        let user = req.user.dataValues;
        console.log(`User: `, user);
        
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
        
        // Validate that the property belongs to the own who made the request
        if(user) {
            console.log(`User id: `, user.id);
            console.log(`Type: `, typeof(user.id));
            console.log(`Property owner id: ${property.ownerId}`)
            
            if(user.id.toString() !== property.ownerId.toString()) {
                console.log(`The user doesn't own this property going back...`);
                console.log(`User: `, req.user.name);
                return res.redirect("/user/property/admin");
            }
        } else {
            console.log(`Req user doesn't exists`);
            return res.redirect("/user/property/admin");
        }
        
        return res.render(`user/property/set-image`, {
            page: `Set images for ${property.title}`,
            property
        });
    } catch(err) {
        console.log(err);
        return res.redirect("/user/property/admin");
    }
}

export default setImage;
