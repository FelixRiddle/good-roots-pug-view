import ImageEditor from "../../../lib/property/ImageEditor.js";


// I love doing this one haha
(async () => {
    let imgEditor = new ImageEditor("images");
    
    imgEditor.bindOnChange();
    let images = await imgEditor.fetchAll();
    
    console.log(`Property images: `, images);
})();
