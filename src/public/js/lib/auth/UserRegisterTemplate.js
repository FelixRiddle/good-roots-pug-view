/**
 * User login template
 */
export default class UserLoginTemplate {
    /**
     * 
     * @param {string} name Name
     * @param {string} email E-Mail
     * @param {string} password Password
     * @param {string} confirmPassword 
     */
    constructor(name, email, password, confirmPassword) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
};
