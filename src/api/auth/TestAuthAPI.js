import axios from "axios";

export default class TestAuthAPI {
    /**
     * User data
     * 
     * @param {Object} userData User data
     * @param {string} serverUrl The server url
     */
    constructor(userData, serverUrl) {
        this.userData = userData;
        this.serverUrl = serverUrl;
        
        this.setInstance(serverUrl);
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
            console.log(`Added jwt authentication token to axios instance`);
            console.log(`Header: `, headers["Cookie"]);
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
     * Register user
     */
    async registerUser() {
        const res = await this.instance.post("/auth/register", this.userData)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        return res.data;
    }
    
    /**
     * Login user
     */
    async loginUser() {
        const res = await this.instance.post("/auth/login", {
            email: this.userData.email,
            password: this.userData.password,
        })
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        return res.data;
    }
    
    /**
     * Delete user
     */
    async deleteUser() {
        const res = await this.instance.post("/user/delete", this.userData)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        return res.data;
    }
}
