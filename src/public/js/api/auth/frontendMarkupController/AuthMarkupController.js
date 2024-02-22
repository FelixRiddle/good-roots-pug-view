// Login
import FrontendAuthAPI from "../FrontendAuthAPI.js";

// Maybe later there's a process to get the server url, so I would just update this function
// that's why I don't use location.origin alone
import serverUrl from "../../../web/serverUrl.js";

const AUTH_ACTION_LOGIN = 1;
const AUTH_ACTION_REGISTER = 2;
const AUTH_ACTION_LOGOUT = 3;
const AUTH_ACTION_DELETE = 4;

/**
 * Auth markup controller
 * 
 * To remove boilerplate and go straight to the point
 * 
 * For authentication my standards are:
 * * Submit button id is: 'authFormSubmit'
 * * Email field id is: 'email'
 * * Password field id is: 'password'
 * 
 * The id is the same name of the field in the object data
 */
export default class AuthMarkupController {
    formFieldsId = [];
    formAction = 0;
    
    constructor() { }
    
    /**
     * Append form field id
     * 
     * @param {string} id 
     */
    appendFormFieldId(id) {
        this.formFieldsId.push(id);
    }
    
    /**
     * Get form data
     * 
     * @returns {Object}
     */
    getFormData() {
        const resultObject = {};
        for(const fieldId of this.formFieldsId) {
            // Get input field
            const inputField = document.getElementById(fieldId);
            if(!inputField) {
                console.log(`Couldn't find a given input!`);
                return;
            }
            
            // Set field value to the object with its id as key
            resultObject[fieldId] = inputField.value;
        }
        
        return resultObject;
    }
    
    /**
     * Execute auth action
     * 
     * @returns {Object} Axios response object
     */
    async executeAuthAction() {
            
        // TODO: Frontend validation
        const userData = getLoginUserData();
        
        const api = new FrontendAuthAPI(userData);
        let response = undefined;
        switch(this.authAction) {
            case AUTH_ACTION_LOGIN: {
                const loginResponse = await api.loginUser();
                response = loginResponse;
                break;
            }
            case AUTH_ACTION_REGISTER: {
                const registerResponse = await api.registerUser();
                response = registerResponse;
                break;
            }
            case AUTH_ACTION_LOGOUT: {
                // const registerResponse = await api.registerUser();
                // response = registerResponse;
                break;
            }
            case AUTH_ACTION_DELETE: {
                const res = await api.deleteUser();
                response = res;
                break;
            }
            default: {
                break;
            }
        };
        
        return response;
    }
    
    /**
     * Bind on submit click
     * 
     * On submit click perform actions to authenticate
     * 
     * @returns 
     */
    async bindOnSubmitClick() {
        // Get submit input element
        const submitId = "authFormSubmit";
        const submitInput = document.getElementById(submitId);
        if(!submitInput) {
            console.log(`Couldn't find submit input!`);
            return;
        }
        
        // On submit click
        const thisObj = this;
        submitInput.addEventListener("click", async (e) => {
            e.preventDefault();
            
            // Perform the selected auth action
            const response = thisObj.executeAuthAction();
            console.log(`Response: `, response);
            
            window.location.href = `${serverUrl()}/home`;
        });
    }
    
    // --- Set actions ---
    /**
     * Set the auth action to login
     */
    setActionLogin() {
        this.authAction = AUTH_ACTION_LOGIN;
    }
    
    setActionRegister() {
        this.authAction = AUTH_ACTION_REGISTER;
    }
    
    setActionLogout() {
        this.authAction = AUTH_ACTION_LOGOUT;
    }
    
    /**
     * Delete requires authentication
     * 
     * So this should be performed with a class specifically for '/user' routes manipulation
     * [Possibility Allowance]
     */
    setActionDelete() {
        this.authAction = AUTH_ACTION_DELETE;
    }
}
