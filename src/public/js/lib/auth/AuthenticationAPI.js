import axios from "axios";

export default class AuthenticationAPI {
    /**
     * User data
     * 
     * @param {Object} userData User data
     * @param {string} serverUrl The server url
     */
    constructor(userData, serverUrl) {
        this.userData = userData;
        
        // Location is not defined in nodejs
        const isUndefined = typeof(location) === 'undefined';
        if(!isUndefined) {
            this.instance = axios.create({
                baseURL: `${location.origin}/auth`,
                timeout: 2000,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else if(!serverUrl) {
            throw Error("Server url is required when the AuthenticationAPI is used in NodeJS");
        } else {
            this.instance = axios.create({
                baseURL: `${serverUrl}/auth`,
                timeout: 2000,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    }
    
    /**
     * Register user
     */
    async registerUser() {
        const res = await this.instance.post("/register", this.userData)
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
        const res = await this.instance.post("/login", {
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
}
