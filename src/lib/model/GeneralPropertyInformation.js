
/**
 * General property information
 */
export default class GeneralPropertyInformation {
    constructor(models, propertyId) {
        this.GeneralPropertyInformation = models.GeneralPropertyInformation;
        this.PropertySellerMessages = models.PropertySellerMessages;
        
        this.propertyId = propertyId;
    }
    
    /**
     * Count private messages sent to the owner of this property
     */
    async countPrivateMessages() {
        const propertyId = this.propertyId;
        
        // Find out to what general information it belongs
        let generalPropertyInformation = await this.GeneralPropertyInformation.findOne({
            where: {
                propertyId,
            }
        });
        
        // If it doesn't exist, create it
        if(!generalPropertyInformation) {
            generalPropertyInformation = await this.GeneralPropertyInformation.create({
                propertyId,
            });
        }
        const genInfoId = generalPropertyInformation.id;
        
        console.log(`Property id: `, propertyId);
        const messagesCount = await this.PropertySellerMessages.count({
            where: {
                generalPropertyInformationId: genInfoId,
            }
        });
        
        return messagesCount;
    }
}
