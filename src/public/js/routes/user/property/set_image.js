import ImageEditor from "../../../lib/property/images/images_editor/ImageEditor.js";

// Formulary
let formulary = document.getElementById("publish_image");
if(formulary) {
    formulary.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}

// I love doing this one haha
(async () => {
    let imgEditor = new ImageEditor("images");
    
    await imgEditor.bindOnChange();
})();
