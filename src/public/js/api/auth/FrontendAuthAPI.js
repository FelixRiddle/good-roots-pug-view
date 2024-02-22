// const axios = require("axios");

// const { authRoute, userRoute } = require("../../controller/auth/authRoute");
// const serverUrl = require("../../web/serverUrl");
import axios from "axios";

import { authRoute, userRoute } from "../../controller/auth/authRoute.js";
import serverUrl from "../../web/serverUrl.js";

export default class FrontendAuthAPI {
    loggedIn = false;
    
    /**
     * User data
     * 
     * @param {Object} userData User data
     * @param {string} url The server url
     */
    constructor(userData, url) {
        this.userData = userData;
        this.serverUrl = serverUrl(url);
        
        this.setInstance(this.serverUrl);
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
     * Register user
     */
    async registerUser() {
        const res = await this.instance.post(`${authRoute()}/register`, this.userData)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        return res.data;
    }
    
    /**
     * Login user
     * 
     * It's not very helpful, because I can't access protected endpoints with the axios instance.
     */
    async loginUser() {
        const endpoint = `${authRoute()}/login`;
        
        const url = `${serverUrl()}${endpoint}`;
        console.log(`True url: `, url);
        
        const axiosUrl = `${this.serverUrl}${endpoint}`;
        console.log(`Axios url: ${axiosUrl}`);
        
        const res = await this.instance.post(endpoint, this.userData)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        if(!res) {
            console.log(`No response`);
            return;
        }
        
        // Set cookie to the browser
        // It's set automatically
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
        
        // Set cookie to the axios instance
        // this.setInstance()
        
        return res.data;
    }
    
    /**
     * Login get jwt
     * 
     * Use to login and get the jwt token directly
     */
    async loginGetJwt() {
        const res = await this.instance.post(`${authRoute()}/login_get_jwt`, {
            email: this.userData.email,
            password: this.userData.password,
        })
            .then((res) => res)
            .catch((err) => {
                console.log(`Couldn't get JWT token`);
                console.error(err);
                return;
            });
        
        // Update instance
        this.setInstance(this.serverUrl, res.data.token);
        
        this.loggedIn = true;
        
        return res.data;
    }
    
    // --- User routes ---
    /**
     * Delete user
     */
    async deleteUser() {
        const res = await this.instance.post(`${userRoute()}/delete`, this.userData)
            .then((res) => res)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        return res.data;
    }
    
    // --- Email ---
    /**
     * Send email to reset password
     * 
     * The reset password process can't be done without this step, to ensure the user and
     * email exists and the user owns that email.
     */
    async enableResetPassword() {
        const res = await this.instance.post(`${userRoute()}/password/reset`, {
            email: this.userData.email,
        })
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        return res;
    }
    
    /**
     * Create new passsword
     * 
     * Second step of resetting password, with this step the user sets the new password.
     * 
     * @param {string} token Token to reset the password
     * @param {string} password 
     * @param {string} confirmPassword 
     */
    async createNewPassword(token, password, confirmPassword) {
        const res = await this.instance.post(`${userRoute()}/password/create/${token}`, {
            password,
            confirmPassword
        })
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
                return;
            });
        
        return res;
    }
}
