// import { Dropzone } from "dropzone";

// // Dropzone
// let dropzone = new Dropzone("#image");
// dropzone.on("addedFile", file => {
//     console.log(`File added: ${file.name}`);
// });

// // Dropzone.options.image = {
// dropzone.options.image = {
//     // First, insert previous values
//     ...dropzone.options.image,
//     // Now update the values we want to change
//     dictDefaultMessage: "Upload your image...",
//     acceptedFiles: ".png,.jpg,.jpeg",
//     // In Megabytes
//     maxFilesize: 5,
//     maxFiles: 1,
//     parallelUploads: 1,
//     autoProcessQueue: false,
//     addRemoveLinks: true,
//     paramName: "image",
//     init: () => {
//         try {
//             // Get dropzone
//             const dropzone = this;
//             const publishBtn = document.querySelector("#publish");
            
//             // Check if it exists
//             if(!dropzone) {
//                 console.log(`Couldn't get dropzone.`);
//             }
            
//             publishBtn.addEventListener("click", () => {
//                 console.log(`First dropzone publish`);
//                 dropzone.processQueue();
//             });
            
//             dropzone.on("queuecomplete", () => {
//                 if(dropzone.getActiveFiles().length === 0) {
//                     window.location.href = "/user/property/admin"
//                 }
//             });
//         } catch(err) {
//             console.log(err);
//         }
//     },
// }
