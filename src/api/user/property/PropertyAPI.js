import axios from "axios";
import PropertyModel from "./PropertyModel.js";

/**
 * Property API
 */
export default class PropertyAPI {
    /**
     * 
     * @param {AxiosInstance} instance Axios instance that is already logged in
     */
    constructor(instance) {
        this.instance = instance;
    }
    
    /**
     * Create a property
     * 
     * @param {object} property Property information
     */
    async createProperty(property) {
        const res = await this.instance.post("/user/property/create", property)
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
            });
        
        return res;
    }
}
