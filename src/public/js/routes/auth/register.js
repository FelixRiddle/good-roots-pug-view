import AuthMarkupController from "../../api/auth/frontendMarkupController/AuthMarkupController.js";

// Takes the login form and uploads data to the server
(async() => {
    const authMarkupCtrl = new AuthMarkupController();
    await authMarkupCtrl.registerPreset();
})();
