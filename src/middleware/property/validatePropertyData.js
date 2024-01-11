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
        console.log(`Property coudln't be validated`);
        return res.send({
            messages: [{
                message: "Property couldn't be validated",
                error: true,
            }]
        });
    }
}

export default validatePropertyData;
