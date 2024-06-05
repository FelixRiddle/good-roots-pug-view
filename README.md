# About

Good roots stack, pug view, this is because the course uses it, not because I want to.

The project is a real estate app, in which you can register, login, publish your house, add images, etc.

# Course project

Project made along the course of [Node.js - Bootcamp Desarrollo Web inc. MVC y REST APIs](https://www.udemy.com/course/nodejs-bootcamp-desarrollo-web-mvc-y-rest-apis/).

# Commands

Check [docs/Commands/Commands.md](Commands)

# Notes

- csurf package was deprecated

Because the package was deprecated, I'll be not using it anymore.
It was used in the course.

# Env variables to set

Create the file '.env' at the root of the project and add these variables

```bash
# This server data
SERVER_HOST=localhost
SERVER_PORT=3000
# Defaults to https(it's set inside the app if not given)
SERVER_PROTOCOL=https

BACKDOOR_SERVER_ACCESS_URL=http://localhost:38002

# Allowed origins
ORIGIN=http://localhost:3000

# --- Databases ---
# General username and password for all databases(Recommended)
DATABASE_USERNAME=username
DATABASE_PASSWORD=password

# General Database name and Collection/Table name
DATABASE_NAME=bienesraices_node_mvc
DATABASE_COLLECTION_NAME=user

# --- DBSpecific ---
# MySQL database
# The database should never be visible from the outside(From internet)
# It should be accessed through specific endpoints in the backend
MYSQL_DATABASE_NAME=per-auth
MYSQL_USERNAME=username
MYSQL_PASSWORD=password
MYSQL_HOST=localhost
MYSQL_PORT=3306

# MongoDB
MONGO_HOST=localhost
MONGO_PORT=27017


### Authentication, Keys and Sensible stuff ###
# Note: Never share any of these!!

# E-Mail
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=YOUR_MAILTRAP_USER
EMAIL_PASSWORD=YOUR_MAILTRAP_PASSWORD

# When you reach a rate limit, you might want to turn this on
DISABLE_MAIL=false

# JWT Secret key
# It should have a minimum of 64 characters by JWT standard
JWT_SECRET_KEY=YOUR_SECRET

# Google
# Used for reverse-geocoding
# Remember to check that the geocding api is enabled, and the key doesn't restrict access to your domain
# nor the geocoding api.
GOOGLE_API_KEY=YOUR_API_KEY

### Unused keys(don't add these) ###
# Arcgis client side tokens(OAuth 2.0)
ARCGIS_CLIENT_ID=CLIENT_ID
ARCGIS_CLIENT_SECRET=CLIENT_SECRET
# Not used
ARCGIS_CLIENT_TEMPORARY_TOKEN=INSERT_TOKEN
```

Warning: In case you are new, don't ever share anything you put in '.env' file, with anyone.

# Security concerns

Currently the CSP policy is almost useless as it allows everything, it must be setted up more strictly.

# Production

Some helpful links

- [Webpack Production](https://webpack.js.org/guides/production/)

# References

Some references from where I got important information to build this app

- [Webpack 5 Crash Course | Frontend Development Setup](https://www.youtube.com/watch?v=IZGNcSuwBZs)
