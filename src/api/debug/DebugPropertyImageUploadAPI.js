import DebugPropertyImageUploadClass from "../../debug/DebugPropertyImageUploadClass.js";

/**
 * 
 */
export default class DebugPropertyImageUploadAPI {
    
    constructor() {
        
    }
    
    /**
     * Create instance
     * 
     * @param {string} serverUrl The server url
     * @param {string} jwtToken JWT Authentication token(optional)
     */
    setInstance(serverUrl, jwtToken = '') {
        // Location is not defined in nodejs
        const isUndefined = typeof(location) === 'undefined';
        
        // Create headers
        let headers = {
            "Content-Type": "application/json"
        };
        if(jwtToken) {
            // Add jwt token
            headers["Cookie"] = `_token=${jwtToken}`;
        }
        
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
     * Create message
     * 
     * @param {*} title 
     * @param {*} message 
     * @param {*} status 
     * @param {*} imageName 
     * @returns 
     */
    async createMessage(title, message, status, imageName) {
        // Create message
        const imageInfo = new DebugPropertyImageUploadClass(title, message, status, imageName);
        
        const res = await this.instance.post("/debug/model/debug_property_image_upload", {
            imageInfo,
        })
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        return res.body;
    }
}
