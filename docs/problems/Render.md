# Render problems

Made this to inform developers about common problems with rendering.

## Express redirect vs render with pug

It seems like redirecting with express works fine when using the root path, for example

```javascript
res.redirect("/user/property/admin");
```

But when rendering with pug, you CAN'T use the root path, you must use instead

```javascript
res.render("user/property/admin");
```

Notice that the first slash is not there.
