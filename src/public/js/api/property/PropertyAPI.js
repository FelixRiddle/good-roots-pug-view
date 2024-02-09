import axios from "axios";

/**
 * Public property api
 * 
 * Only for properties that have been published
 */
export default class PropertyAPI {
    /**
     * Property api
     * 
     * @param {string} serverUrl The server url
     */
    constructor(serverUrl) {
        // Location is not defined in nodejs
        const isUndefined = typeof(location) === 'undefined';
        if(!isUndefined) {
            this.instance = axios.create({
                baseURL: `${location.origin}/property`,
                timeout: 2000,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            console.log(`Detected frontend`);
        } else if(!serverUrl) {
            throw Error("Server url is required when the UserAPI is used in NodeJS");
        } else {
            this.instance = axios.create({
                baseURL: `${serverUrl}/property`,
                timeout: 2000,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            console.log(`Detected backend`);
        }
    }
    
    /**
     * Fetch all
     */
    fetchAll() {
        console.log(`PropertyAPI | /operation/get_all`);
        const res = this.instance.get("/operation/get_all")
            .then((res) => {
                console.log(`Properties fetched!`);
                
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                console.log(`Error, couldn't fetch the properties`);
            });
        
        return res;
    }
}
