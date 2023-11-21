import { Dropzone } from "dropzone";

Dropzone.options.image = {
    dictDefaultMessage: "Upload your image...",
    acceptedFiles: ".png,.jpg,.jpeg",
    maxFilesize: 5, // Megabytes
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    paramName: "image",
    init: () => {
        try {
            // Get dropzone
            const dropzone = this;
            const publishBtn = document.querySelector("#publish");
            
            // Check if it exists
            if(!dropzone) {
                console.log(`Couldn't get dropzone.`);
            }
            
            publishBtn.addEventListener("click", () => {
                console.log(`First dropzone publish`);
                dropzone.processQueue();
            });
            
            dropzone.on("queuecomplete", () => {
                if(dropzone.getActiveFiles().length === 0) {
                    window.location.href = "/user/property/admin"
                }
            });
        } catch(err) {
            console.log(err);
        }
    },
}

// Dropzone
let dropzoneTest = new Dropzone("#image");
dropzoneTest.on("addedFile", file => {
    console.log(`Second dropzone add image`);
    console.log(`File added: ${file.name}`);
});

// const publish2 = document.querySelector("#testDropzone");
// publish2.addEventListener("click", () => {
//     console.log(`Second dropzone publish`);
//     dropzone.processQueue();
// });
