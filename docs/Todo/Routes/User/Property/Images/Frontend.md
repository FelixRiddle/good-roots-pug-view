# Frontend

- [x] Preview of previous images, if it has
- [x] Fetch all images on the frontend
- [x] On change
    - [x] Send images to server
    - [x] Update images on the frontend
- [x] Set images
    - [ ] Dropzone to add images
- [x] Remove images on icon click
- [x] Publish property is disabled when there are no images

## On configuration maximum

When the maximum is reached, we have to detect which ones are extra, to remove them from the input.

We first have to fetch image names to compare them to the input image names.

But the image names are encoded, and also are a path of the public api(in property images).

- [x] Decode names and remove path elements
<!-- PropertyImages.names() -->

Now we have to compare both of them to know which ones are different
