// 8 Lines, what previously took like 60
import AuthMarkupController from "../../api/auth/frontendMarkupController/AuthMarkupController.js";

(async() => {
    const authMarkupCtrl = new AuthMarkupController()
        .setActionLogin()
        .appendFormFieldId("email")
        .appendFormFieldId("password");
    
    await authMarkupCtrl.bindOnSubmitClick();
})();
