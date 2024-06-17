
/**
 * General property information
 */
export default class GeneralPropertyInformation {
    constructor(models, propertyId) {
        
        if(!models) {
            throw new Error(`Models are required!`);
        }
        
        if(!propertyId) {
            throw new Error(`Property id is required!`);
        }
        
        this.models = models;
        
        this.propertyId = propertyId;
    }
    
    /**
     * Get or create general property information
     */
    async get() {
        const propertyId = this.propertyId;
        
        // Find out to what general information it belongs
        let generalPropertyInformation = await this.models.generalPropertyInformation.findOne({
            where: {
                propertyId,
            }
        });
        
        // If it doesn't exist, create it
        if(!generalPropertyInformation) {
            generalPropertyInformation = await this.models.generalPropertyInformation.create({
                propertyId,
            });
        }
        
        return generalPropertyInformation;
    }
    
    /**
     * Count private messages sent to the owner of this property
     */
    async countPrivateMessages() {
        const generalPropertyInformation = await this.get();
        const genInfoId = generalPropertyInformation.id;
        
        const messagesCount = await this.models.propertySellerMessage.count({
            where: {
                generalPropertyInformationId: genInfoId,
            }
        });
        
        return messagesCount;
    }
}
