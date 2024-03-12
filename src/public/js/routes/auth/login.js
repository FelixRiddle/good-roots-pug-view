import API from "felixriddle.good-roots-ts-api";

// Takes the login form and uploads data to the server
(async() => {
    console.log(`Setting up a markup controller`);
    const authMarkupCtrl = new API.AuthMarkupController();
    await authMarkupCtrl.loginPreset();
    console.log(`Login preset`);
    authMarkupCtrl.toggleRedirection();
})();
