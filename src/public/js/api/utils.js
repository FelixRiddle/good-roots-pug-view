import axios from "axios";

import serverUrl from "../web/serverUrl.js";

/**
 * Create axios instance on the frontend or backend
 * 
 * @param {*} url 
 * @param {*} endpoint 
 */
function createAxiosInstance(url, endpoint) {
    
    // Get full app url
    let fullAppUrl = ``;
    if(endpoint) {
        fullAppUrl = `${serverUrl(url)}/${endpoint}`;
    } else {
        fullAppUrl = `${serverUrl(url)}`;
    }
    
    // Create axios instance
    const instance = axios.create({
        baseURL: `${fullAppUrl}`,
        timeout: 2000,
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    return instance;
}

export default createAxiosInstance;
