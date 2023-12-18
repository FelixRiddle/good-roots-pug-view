// I can't get dropzone to work
// I won't use it D:
import Dropzone from "dropzone";

let dropElement = document.getElementById("images");
if(!dropElement) {
    console.log(`Couldn't find the dropzone element!`);
} else {
    console.log(`Drop element found!`);
}

Dropzone.options.uploadForm = {
    
    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 100,
    maxFiles: 100,
    
    init: () => {
        console.log(`Emit stressed`);
        
        const myDropzone = this;
    
        // First change the button to actually tell Dropzone to process the queue.
        this.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
            // Make sure that the form isn't actually being sent.
            e.preventDefault();
            // e.stopPropagation();
            
            console.log(`Sending files to the backend!`);
            myDropzone.processQueue();
        });
    }
}

let dropzone = new Dropzone("#images", {
    url: "/examples/publish_image/dropzone",
    // Now update the values we want to change
    dictDefaultMessage: "Upload images...",
    acceptedFiles: ".png,.jpg,.jpeg",
    // In Megabytes
    maxFilesize: 5,
    maxFiles: 10,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    paramName: "images",
});

dropzone.options.uploadForm = {
    
    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 100,
    maxFiles: 100,
    
    init: () => {
        const myDropzone = this;
        console.log(`Emit normal`);
        
        // First change the button to actually tell Dropzone to process the queue.
        this.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
            // Make sure that the form isn't actually being sent.
            e.preventDefault();
            // e.stopPropagation();
            
            console.log(`Sending files to the backend!`);
            myDropzone.processQueue();
        });
    }
}

dropzone.on("addedFile", file => {
    console.log(`File added: ${file.name}`);
});
