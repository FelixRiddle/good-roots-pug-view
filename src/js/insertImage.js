import { Dropzone } from "dropzone";

Dropzone.options.image = {
    dictDefaultMessage: "Upload your image...",
    acceptedFiles: ".png,.jpg,.jpeg",
    maxFilesize: 5, // Megabytes
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
}
