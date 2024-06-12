import { Models } from "felixriddle.ts-app-models";

/**
 * Create models instance
 */
export default function createModels() {
    const models = new Models();
    
    // Models are not generated automatically we've gotta do it manually
    models.Category = models.category();
    models.Price = models.price();
    models.Property = models.property();
    models.User = models.user;
    models.DebugPropertyImageUpload = models.debugPropertyImageUpload();
    models.UserMessages = models.userMessages();
    
    return models;
}
