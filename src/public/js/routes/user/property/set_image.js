import ImageEditor from "../../../lib/property/ImageEditor.js";

let buttonElement = document.getElementById("publish");
if(buttonElement) {
    // buttonElement.addEventListener("")
}

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
    
    imgEditor.bindOnChange();
})();
