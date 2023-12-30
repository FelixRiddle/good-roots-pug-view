# Images API

API To update/set property images

# Frontend

- [ ] Preview of previous, if it has
- [ ] Fetch all images on the frontend
- [x] Set images
    - [ ] Deletes previous images
    
    To not duplicate them

I need finer control than this, we're going to do this

- [ ] Create a js configuration file, export it to the frontend and also use it in the backend
    - [ ] Images
        - [ ] Maximum 10
        - [ ] Minimum 1
            - [ ] Properties with no images can't be published.
            <!-- This is a quality control -->
    - [ ] Size
        - [ ] Maximum 5mb
        - [ ] Minimum 100kb 🥶
        <!-- I'm not so sure about this '1kb' thing, because it has to be pretty low res for it to be so low -->
        <!-- Update: Changed it to 100 kb, because I've scaled down a house to 1366x768 and it weights 891kb 😒 -->
        <!-- 100kb is already a dubious image, keep a watch on bro 🤔🤨😤 -->

- [ ] Configuration validation

# Backend

On upload an image pass the configuration tests

- [ ] Endpoints should be at '/property/images'

Use an array for each.

    - [ ] '/images/add_image' to add image/s
        - [ ] On name collision, warn the user, and don't insert the image
        
        This is really ambiguos, maybe it's better to replace maybe not I don't know
        
    - [ ] '/images/get_image' to get image/s
    - [ ] '/images/delete_image' to delete an image or multiple images
    - [ ] '/images/set_image' to set the images(replace previous and delete previous that are no more)

- [ ] Frontend API to communicate with this tiny images app
    - [ ] Reads configuration and works fine
    - [ ] Perform the rest of operations
