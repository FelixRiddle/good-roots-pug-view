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
        const dropzone = this;
        const publishBtn = document.querySelector("#publish");
        
        publishBtn.addEventListener("click", () => {
            dropzone.processQueue();
        });
        
        dropzone.on("queuecomplete", () => {
            if(dropzone.getActiveFiles().length === 0) {
                window.location.href = "/user/property/admin"
            }
        });
    }
}
