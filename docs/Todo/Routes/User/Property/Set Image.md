# Set image endpoint

# Frontend

- [ ] Preview of previous, if it has
- [x] Set images
    - [ ] Deletes previous images
    
    To not duplicate them

I need finer control than this, we're going to do this

- [ ] Create a js configuration file, export it to the frontend and also use it in the backend
    - [ ] Set maximum amount of files to 10
    - [ ] Set minimum to 1

- [ ] Endpoints should be at '/property/images'

Use an array for each.

    - [ ] '/images/add_image' to add image/s
        - [ ] On name collision, warn the user, and don't insert the image
        
        This is really ambiguos, maybe it's better to replace maybe not I don't know
        
    - [ ] '/images/get_image' to get image/s
    - [ ] '/images/delete_image' to delete an image or multiple images

- [ ] Frontend API to communicate with this tiny images app
    - [ ] Reads configuration and works fine
    - [ ] Perform the rest of operations
