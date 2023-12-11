# Render problems

Common problems I have had when developing this app, and solutions for them.

## Express redirect vs render with pug

It seems like redirecting with express works fine when using the root path, for example

```javascript
res.redirect("/user/property/admin");
```

But when rendering with pug, you CAN'T use the root path, you must use relative url instead

```javascript
res.render("user/property/admin");
```

Notice that the first slash is not there.

# Render absolute paths

Use the app main url(something like `http://localhost:3000`) + the endpoint of the file to render.

# Conclusion

When rendering pug files, you can't use absolute paths, but inside the pug files, you can use absolute paths.
