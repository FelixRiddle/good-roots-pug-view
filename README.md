# Course project

Project made along the course of [Node.js - Bootcamp Desarrollo Web inc. MVC y REST APIs](https://www.udemy.com/course/nodejs-bootcamp-desarrollo-web-mvc-y-rest-apis/).

Done in english because the default language of programming is english.

This is not a serious project, I won't keep developing it too much.

# Notes

- csurf package was deprecated

Because the package was deprecated, I'll be not using it anymore.

# About

The project is about real state, in which you can register, login, publish your house, add images, etc.

# Env variables to set

Create the file '.env' at the root of the project and add these variables

```bash
# JWT Secret key
# It should have a minimum of 64 by JWT standard
JWT_SECRET_KEY=YOUR_SECRET

# This server data
SERVER_HOST=localhost
SERVER_PORT=3000

# MySQL database
DB_NAME=good_roots_tutorial_node_mvc
DB_USERNAME=username
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306

# E-Mail
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=YOUR_MAILTRAP_USER
EMAIL_PASSWORD=YOUR_MAILTRAP_PASSWORD

# Allowed origins
ORIGIN=http://localhost:3000
```

Warning: In case you are new, don't ever share anything you put in '.env' file, with anyone.
