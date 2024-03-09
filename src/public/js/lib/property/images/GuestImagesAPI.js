/**
 * Images API for a user that is not logged in
 */
export default class GuestImagesAPI {
    /**
     * Images api
     * 
     * @param {number} propertyId This property id
     */
    constructor(propertyId) {
        // Create axios instance
        this.instance = axios.create({
            baseURL: `${window.location.origin}/property`,
            timeout: 2000,
            headers: {'Content-Type': 'application/json'}
        });
        this.propertyId = propertyId;
    }
    
    // --- API Calls ---
    /**
     * When the page loads fetch all images
     */
    async fetchAll() {
        let res = await this.instance.get(`/operation/get_all/${this.propertyId}`)
            .then((res) => {
                console.log(`Fetch property images result: `, res.data);
                return res;
            }).catch((err) => {
                console.log(`Error when fetching image names from the backend: `, err);
            });
        
        return res.data.images;
    }
}
