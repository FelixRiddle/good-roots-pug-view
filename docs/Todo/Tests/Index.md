# Tests

Perform tests on the application

- [ ] Login
    - [ ] The user that is logged in can make changes on protected endpoints
- [ ] Register
    - [ ] Successful registration
    - [ ] Failed registrations
        - [ ] Wrong email
        - [ ] Short password
        - [ ] Long password
        - [ ] Confirmation password mismatch

# Security

- [ ] Only users with confirmed email can access protected endpoints
- [ ] Every protected endpoint is accessible to a user
- [ ] Every protected endpoint is not accessible to a person that is not logged in
- [ ] A user logged in can't change other users data by accessing protected endpoints

Only when all these tests pass, can the website be considered secure.

# Frontend testing

Things to perform frontend testing

- [ ] Seed data
    - [x] Seed users
    - [x] Seed categories
    - [x] Seed prices
    - [ ] Seed properties
        - [ ] Seed property images
