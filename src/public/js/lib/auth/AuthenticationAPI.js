import axios from "axios";

export default class AuthenticationAPI {
    /**
     * User data
     * 
     * @param {Object} userData User data
     */
    constructor(userData) {
        this.userData = userData;
        this.instance = axios.create({
            baseURL: `${location.origin}/auth`,
            timeout: 2000,
            headers: {
                "Content-Type": "application/json"
            }
          });
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
        
        return res;
    }
}
