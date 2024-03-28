import { AuthMarkupController } from "felixriddle.good-roots-ts-api";

// Takes the login form and uploads data to the server
(async() => {
    console.log(`Setting up a markup controller`);
    const authMarkupCtrl = new AuthMarkupController();
    await authMarkupCtrl.loginPreset();
})();
