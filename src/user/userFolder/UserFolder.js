/**
 * Abstraction of the user folder
 */
export default class UserFolder {
    constructor(userId) {
        this.userId = userId;
    }
    
    // --- Get folder paths ---
    /**
     * Relative user property folder
     * 
     * Gets the relative user property folder path from public folder
     * 
     * @returns {string}
     */
    propertyFolder() {
        return `${this.folder(this.userId)}/property`;
    }
    
    /**
     * Relative user folder
     * 
     * Gets the relative user folder from public folder
     * 
     * @returns {string} User folder
     */
    folder() {
        return `public/user/${this.userId}`;
    }
}
