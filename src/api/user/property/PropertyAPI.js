/**
 * Property API
 */
export default class PropertyAPI {
    /**
     * 
     * @param {AxiosInstance} instance Axios instance that is already logged in
     */
    constructor(instance) {
        this.instance = instance;
    }
    
    /**
     * Create a property
     * 
     * @param {object} property Property information
     */
    async createProperty(property) {
        const res = await this.instance.post("/user/property/create", {property})
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
            });
        
        return res;
    }
    
    /**
     * Get all
     */
    async getAll() {
        const res = await this.instance.get("/user/property/operation/get_all")
            .then((res) => res.data)
            .catch((err) => {
                console.error(err);
            });
        
        return res;
    }
    
    /**
     * Delete all
     * 
     * Delete every user property
     */
    async deleteAll() {
        const properties = await this.getAll();
        
        if(properties && properties.properties) {
            for(const property of properties.properties) {
                await this.instance.post(`/user/property/delete/${property.id}`)
                    .then((res) => {
                        // console.log(`Property ${property.title} deleted`);
                        // console.log(`Response: `, res.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        }
    }
}
