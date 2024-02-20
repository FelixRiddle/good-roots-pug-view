import createAxiosInstance from "../utils.js";

/**
 * Public property api
 * 
 * Only for properties that have been published
 */
export default class PropertyAPI {
    debug = false;
    
    /**
     * Property api
     * 
     * @param {string} serverUrl The server url
     */
    constructor(serverUrl) {
        createAxiosInstance(serverUrl, "property");
    }
    
    /**
     * Fetch all
     */
    fetchAll() {
        if(this.debug) {
            console.log(`Fetching properties at /property/operation/get_all`);
            console.log(`That is for the public properties`);
        }
        
        const res = this.instance.get("/operation/get_all")
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
            });
        
        return res;
    }
}
