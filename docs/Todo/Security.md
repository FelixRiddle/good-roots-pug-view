# Security things TODO

- [ ] Is admin on user model
- [ ] Roles(it's cool, but too complex)
- [ ] Very high rate limit, something like 20000 requests per user

If it's more than that it could be a bot.
Also requests have tiers, by processing and memory usage.
Images should be the most rate limited.

- [x] [FIX] Currently the email is used for unique folder creation, but that's a leak of information

The user's ID could be used here.

Using user id to create folders that contain images.

- [ ] Fix CSP Policies to be more strict

# Security tests

- [ ] An authenticated person can't edit someone else's property

# Only admin routes

Protect this routes with a only admin hook

- [ ] examples/
