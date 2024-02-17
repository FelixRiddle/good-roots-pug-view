/**
 * Debug property image upload class
 * 
 *      action: 'action name',
 *      imageName: 'image Name',
 *      title: 'title',
 *      status: 1,
 *      message: 'Message',
 */
export default class DebugPropertyImageUploadClass {
    constructor(title, message, status, imageName) {
        this.title = title;
        this.message = message;
        this.status = status;
        this.imageName = imageName;
    }
}
