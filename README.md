# Course project

Project made along the course of [Node.js - Bootcamp Desarrollo Web inc. MVC y REST APIs](https://www.udemy.com/course/nodejs-bootcamp-desarrollo-web-mvc-y-rest-apis/).

Done in english because the default language of programming is english.

# Commands

Check [docs/Commands.md]

# Notes

- csurf package was deprecated

Because the package was deprecated, I'll be not using it anymore.

# About

The project is a real estate app, in which you can register, login, publish your house, add images, etc.

# Env variables to set

Create the file '.env' at the root of the project and add these variables

```bash
# This server data
SERVER_HOST=localhost
SERVER_PORT=3000
# Defaults to https(it's set inside the app if not given)
SERVER_PROTOCOL=https

# MySQL database
# The database should never be visible from the outside(From internet)
# It should be accessed through specific endpoints in the backend
DB_NAME=good_roots_tutorial_node_mvc
DB_USERNAME=username
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306

# Allowed origins
ORIGIN=http://localhost:3000

# I don't know if these two are public or private
# I think they're public because it's used in a public script in this example:
# https://developers.arcgis.com/esri-leaflet/maps/
ARCGIS_KEY=INSERT_KEY
ARCGIS_DEFAULT_KEY=INSERT_KEY

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
