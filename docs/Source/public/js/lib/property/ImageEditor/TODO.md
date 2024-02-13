# Images editor TODO

- [ ] Get new images

When uploading images, get the new image files.

For what???

- [x] Remove extra images

When uploading images, remove those that are past the limit.

    - [ ] Warn the user about that
    
    - [x] Don't remove older
    
    Remove the extra that are new, but not older images.
    
    Not necessary because, they're not uploaded already.
    
    Needs a backend test
        - [ ] Test that on the server older files are not deleted, when the maximum quantity of images is exceeded.

- [x] Image size

Validate that the size is in the threshold of the configuration
