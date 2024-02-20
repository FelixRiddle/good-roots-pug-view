# Changelog(Also sort of a TODO list)

[0.0.x] Is considered alpha
[0.x.x] Is considered beta
[x.x.x] Is ready for production

Or even simplier
[release.feature.patch]

# Changelog

[0.x.0]

Status messages

They were somehow working before, but I've completely changed the scheme, now they don't, in this version this is going to be fixed, it's specially necessary when uploading a heavy image.

- Fix status messages

Messages:
* Warn when uploading a heavy image
* Warn for invalid data in formularies

[0.8.0]

Separated authentication to another project, so in this version we will bridge those two

- Bridge authentication with the package 'express-authentication'

[0.7.1]

This update is set to improve the section of setting an image

- The frontend validates the image size
- [Development] Added a section for debug visualization
- [Development] Code is cleaner

[0.7.0]

Continuing the course, this is the part of creating the start page.

- Start page
- Map house view
    - Markers on houses location
    - Markers show a short description
    - You can go to the house page in the marker
- Grid house view with images

This is difficult to do, because previously, I fetched images only by authentication

Note: Houses are fetched all at once still, there's no chunking yet.

[0.6.0]

Going to continue the course, in this version I will do pagination of the admin page.

- Pagination for admin page
- User can click the number of the page they want to see
- Mobile users compatibility

[0.5.0]

- Tests
    - Authentication
        - Reset password
    - Properties
    - User

[0.4.0]

- Property view
- Carousel view
- Clicking on a property opens a new tab to its view

[0.3.0]

- Delete a property

[0.2.0] Edit property

- The user can edit a property
- Can edit images too 

[0.1.1] Map fixed

- Fix map moving back to user position
- Fix map moving marker back to user position

[0.1.0] Authentication + Upload properties with images

- The user can register
- The user can login
- The user can create a property
