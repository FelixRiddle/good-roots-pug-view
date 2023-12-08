import Property from "../../../models/Property.js";
import validateProperty from "../../../public/js/validation/validateProperty.js";

const createProperty = async(req, res) => {
    console.log(`Body: `, req.body);
    
    let result = validateProperty(req.body.property);
    if(result.length > 0) {
        return res.send({
            errors: result
        });
    }
    
    // Insert on the database
    try {
        // Extract data
        const {
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            priceId,
            categoryId,
        } = req.body.property;
        
        const { id: userId } = req.user;
        console.log(`Owner id: `, userId);
        
        // Store data
        const property = Property.create({
            // id(The uuid is generated automatically by the database)
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            image: "",
            published: false,
            userId,
            priceId,
            categoryId,
        });
        let id = property.id;
        
        console.log(`Success the user will be going to set the image`);
        return res.redirect(`/user/property/set-image/${id}`);
    } catch(err) {
        console.log(`Error detected, the user will be redirected to its profile`);
        console.error(err);
    }
    
    return res.render("/user/profile");
}

export default createProperty;