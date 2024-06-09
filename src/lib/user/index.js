
/**
 * Check if the user is the owner of the property
 * 
 * @returns 
 */
export function isSeller(user, property) {
    const userId = user?.id;
    
    return userId === property.userId;
}
