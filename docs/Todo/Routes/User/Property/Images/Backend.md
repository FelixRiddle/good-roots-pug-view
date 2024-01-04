# Backend

On upload an image pass the configuration tests

- [ ] Endpoints should be at '/property/images'

Use an array for each.

- [ ] '/images/add_image' to add image/s
    - [ ] On name collision, warn the user, and don't insert the image
    
    This is really ambiguos, maybe it's better to replace maybe not I don't know
    
- [ ] '/images/get_image' to get image/s
- [x] '/images/get_all' to get every image
<!-- used this instead of 'get_image' -->
- [x] '/images/remove_image' to delete an image or multiple images
- [x] '/images/set_image' to set the images

- [ ] Frontend API to communicate with this tiny images app
    - [ ] Reads configuration and works fine
    - [ ] Perform the rest of operations

# Configuration

The configuration enforcement must first done in the backend and then the frontend,
because even though we can block in the frontend, someone messing with endpoints, can easily overcome it.

- [x] Maximum files

We can easily do this in the backend with multer filter, read the file, check quantity, and if greater, bounce.
