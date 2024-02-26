import axios from "axios";

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
     * Create instance
     * 
     * @param {string} serverUrl The server url
     * @param {string} jwtToken JWT Authentication token(optional)
     */
    setInstance(serverUrl, jwtToken) {
        // Location is not defined in nodejs
        const isUndefined = typeof(location) === 'undefined';
        // Create headers
        let headers = {
            "Content-Type": "application/json",
            "Cookie": `_token=${jwtToken}`,
        };
        
        if(!isUndefined) {
            this.instance = axios.create({
                withCredentials: true,
                baseURL: `${location.origin}`,
                timeout: 2000,
                headers,
            });
        } else if(!serverUrl) {
            throw Error("Server url is required when the AuthenticationAPI is used in NodeJS");
        } else {
            this.instance = axios.create({
                withCredentials: true,
                baseURL: `${serverUrl}`,
                timeout: 2000,
                headers,
            });
        }
    }
    
    /**
     * Create a property
     * 
     * @param {object} property Property information
     */
    async createProperty(property) {
        const res = await this.instance.post("/user/property/create", {property})
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
            });
        
        return res;
    }
    
    /**
     * Get all
     */
    async getAll() {
        const res = await this.instance.get("/user/property/operation/get_all")
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
            });
        
        return res;
    }
    
    /**
     * Delete all
     * 
     * Delete every user property
     */
    async deleteAll() {
        const properties = await this.getAll();
        
        if(properties && properties.properties) {
            for(const property of properties.properties) {
                await this.instance.post(`/user/property/delete/${property.id}`)
                    .then((res) => {
                        // console.log(`Property ${property.title} deleted`);
                        // console.log(`Response: `, res.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        }
    }
    
    /**
     * Edit property by id
     * 
     * @param {number} id Property id
     * @param {object} property Property information to update
     */
    async editPropertyById(id, property) {
        const res = await this.instance.post(`/user/property/edit/${id}`, {
            property
        })
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
            });
        
        return res;
    }
}
