# Commands

Commands for the app

## Run the app in development mode

```bash
npm run dev
```

## App CLI

```bash
npm run start -- --SOMETHING
```

For example to reset tables and seed them with test data

```bash
npm run start -- --resetTables
```

## Testing

For testing I use the jasmine framework, why?, because jest doesn't work for ES modules yet.

To run tests with jasmine

```bash
npm run test
```

Note: I couldn't run jasmine by installing it local to the app, I had to install it globally.

```bash
npm i -g jasmine
```
