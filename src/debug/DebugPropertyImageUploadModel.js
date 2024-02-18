/**
 * Debug property image upload class
 * 
 *      action: 'action name',
 *      imageName: 'image Name',
 *      title: 'title',
 *      status: 1,
 *      message: 'Message',
 */
export default class DebugPropertyImageUploadModel {
    constructor(title, message, status, imageNames, uuid, actionStage) {
        this.title = title;
        this.message = message;
        this.status = status;
        this.imageNames = imageNames;
        this.actionCourseUuid = uuid;
        this.actionStage = actionStage;
    }
}
