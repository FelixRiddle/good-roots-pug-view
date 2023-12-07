import validateProperty from "../../public/js/validation/validateProperty.js";

// Validate property data
const validatePropertyData = async (req, res, next) =>  {
    try {
        let result = validateProperty(req.body.property);
        if(result.length > 0) {
            return res.send({
                errors: result
            });
        }
        
        next();
    } catch(err) {
        console.log(err);
        return res.send({});
    }
}

export default validatePropertyData;
