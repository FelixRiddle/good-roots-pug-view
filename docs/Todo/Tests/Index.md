# Tests

Perform tests on the application

- [x] Login
    - [x] The user that is logged in can make changes on protected endpoints
- [x] Register
    - [x] Successful registration
        - [x] Confirm email
        
        This part is particularly hard, we can get a backdoor access token from the backend, because tests are executed from the backend, and we can set a scope for this token too, just for confirming the email for example.
        
        This way there's no way a user from the frontend will be able to access these endpoints without the token.
        
        - [x] Login after it
        - [x] Delete user
    - [x] Failed registrations
        - [x] Wrong email
        - [x] Short password
        - [x] Long password
        - [x] Confirmation password mismatch

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
