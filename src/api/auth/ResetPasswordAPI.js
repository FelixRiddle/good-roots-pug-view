import axios from "axios";

import { serverUrl } from "../../controllers/env/env.js";

/**
 * Non authenticated reset password API
 */
export default class ResetPasswordAPI {
    /**
     * 
     * @param {object} userData User data
     */
    constructor(userData) {
        this.userData = userData;
        
        const url = serverUrl();
        
        
        // Headers
        let headers = {
            "Content-Type": "application/json"
        };
        this.instance = axios.create({
            withCredentials: true,
            baseURL: url,
            timeout: 2000,
            headers,
        });
    }
    
    /**
     * Start reset password process
     */
    async resetPassword() {
        const res = await this.instance.post("/auth/password/reset", {
            email: this.userData.email,
        })
            .then((res) => res.data)
            .catch(err => {
                // console.error(err);
            });
        
        return res;
    }
}
