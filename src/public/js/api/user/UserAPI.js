import axios from "axios";

export default class UserAPI {
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
                baseURL: `${location.origin}/user`,
                timeout: 2000,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else if(!serverUrl) {
            throw Error("Server url is required when the UserAPI is used in NodeJS");
        } else {
            this.instance = axios.create({
                baseURL: `${serverUrl}/user`,
                timeout: 2000,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    }
    
    /**
     * Delete user
     */
    async deleteUser() {
        const res = await this.instance.post("/delete", this.userData)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        return res.data;
    }
}
